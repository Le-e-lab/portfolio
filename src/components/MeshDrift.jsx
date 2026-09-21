import { useEffect, useRef } from 'react';
import './MeshDrift.css';

/**
 * MeshDrift — brand-adapted "mesh drift" WebGL background.
 *
 * Rebuild of the 21st.dev Shader-Builder mesh-drift effect (MIT component
 * family) as a zero-dependency raw-WebGL component. Dark Carbon field with
 * violet mesh lines that fold and drift; a gentle swirl curves the mesh
 * toward the cursor.
 *
 * Performance guards:
 *  - rAF loop only runs while the tab is visible and while painted
 *  - pixel ratio capped at 1.5 (the mesh is a soft backdrop, not a display)
 *  - prefers-reduced-motion renders one static frame and halts
 *  - resize is handled via ResizeObserver + rAF (no unthrottled listener)
 */

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
// Derivative support (fwidth) is NOT universal. ANGLE/SwiftShader and several
// older mobile GL stacks reject GL_OES_standard_derivatives outright, and a
// rejected #extension fails the entire program — blanking the mesh. Only ask
// for it where the preprocessor reports it, and fall back below otherwise.
#ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

/* ---- value noise / fbm ---- */
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

/* ---- brand palette: carbon field -> deep violet -> accent violet ---- */
const vec3 FIELD = vec3(0.055, 0.055, 0.071);  // #0E0E12
const vec3 DEEP  = vec3(0.094, 0.0, 0.678);    // #1800AD
const vec3 VIVID = vec3(0.169, 0.102, 1.0);    // #2B1AFF

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;

  /* cursor swirl: rotate the sample domain around a point pulled toward the
     cursor so the mesh folds inward when the pointer moves over the field */
  vec2 m = u_mouse - 0.5;
  m.x *= u_resolution.x / u_resolution.y;
  float cd = length(p - m * 0.9);
  float swirl = exp(-cd * 2.6) * 0.55;
  float ang = swirl;
  float ca = cos(ang);
  float sa = sin(ang);
  p = mat2(ca, -sa, sa, ca) * (p - m * 0.25) + m * 0.25;

  float t = u_time * 0.055;

  /* clamp domain-warp amplitude toward the rails so lines never bunch into
     a vertical streak at the screen edges */
  float rail = smoothstep(1.4, 0.7, abs(uv.x - 0.5) * 2.0);
  float warpAmp = mix(1.0, 0.6, rail);

  /* domain warp: two noise fields bend the look-up space so the mesh folds */
  vec2 q = vec2(fbm(p * 1.6 + vec2(t, t * 0.7)),
                fbm(p * 1.6 + vec2(t * 0.8 + 3.1, t)));
  vec2 r = vec2(fbm(p * 1.6 + q * warpAmp * 1.8 + vec2(t * 0.6, 0.0)),
                fbm(p * 1.6 + q * warpAmp * 1.8 + vec2(0.0, t * 0.6)));

  /* mesh: distance to nearest zero-crossing of the warped field */
  float mesh1 = abs(fract(r.x * 8.0) - 0.5);
  float mesh2 = abs(fract(r.y * 8.0) - 0.5);
  float md = min(mesh1, mesh2);

  /* pure Carbon field off-line -- no t-based body */
  vec3 col = FIELD;

  /* Contour width: true screen-space derivative where the GL stack supports
     it, otherwise a resolution-scaled constant that still reads as a hairline. */
#ifdef GL_OES_standard_derivatives
  float aa = fwidth(md) + 1e-4;
#else
  float aa = 0.55 / u_resolution.y + 1e-4;
#endif
  float line = 1.0 - smoothstep(0.0, aa * 1.4, md);

  /* HARD binary gate -- zero skirt, zero feather */
  line = smoothstep(0.4, 0.6, line);
  col = mix(col, VIVID, line); // #2B1AFF core only, no DEEP halo

  /* hairline DEEP edge -- keeps brand depth, still zero body */
  float edge = (1.0 - smoothstep(0.0, aa * 3.0, md)) - line;
  col = mix(col, DEEP, edge * 0.35);

  /* field depth grain so the canvas isn't perfectly flat */
  col *= 0.45 + 0.55 * (0.2 + 0.8 * fbm(p * 4.0 + q * 2.0));

  /* keep the edges low so type above stays legible */
  float vig = smoothstep(1.05, 0.15, length(p) * 1.15);
  col *= mix(0.3, 1.0, vig);

  /* anti-banding dither -- LAST, preserves Carbon */
  col += (hash(gl_FragCoord.xy) - 0.5) * (1.5 / 255.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('MeshDrift shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function linkProgram(gl, vsSource, fsSource) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('MeshDrift program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function MeshDrift({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Static (reduced-motion / no-WebGL) fallback: keep the neutral dark field.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const attrs = { antialias: false, alpha: false, powerPreference: 'low-power' };
    // WebGL2 first; WebGL1 as fallback for older engines. The GLSL is ES 1.00,
    // which both accept.
    const gl = canvas.getContext('webgl2', attrs) || canvas.getContext('webgl', attrs);
    if (!gl) return;

    const mouse = { x: 0.5, y: 0.5 };
    const state = {
      program: null,
      buffer: null,
      uRes: null,
      uTime: null,
      uMouse: null,
      posLoc: null,
      raf: 0,
      running: false,
      visibleTimer: 0,
      ro: null,
      lost: false,
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = rect.width ? (e.clientX - rect.left) / rect.width : 0.5;
      mouse.y = rect.height ? 1 - (e.clientY - rect.top) / rect.height : 0.5;
    };
    // Listen on window so the swirl follows the cursor even when it rests
    // over content stacked above the canvas (wordmark, CTA, cards).
    window.addEventListener('pointermove', onPointer);

    const draw = (now) => {
      state.raf = 0;
      if (!state.running || state.lost || !canvas.isConnected) return;
      if (canvas.width === 0 || canvas.height === 0) return;

      gl.uniform2f(state.uRes, canvas.width, canvas.height);
      gl.uniform1f(state.uTime, now * 0.001);
      gl.uniform2f(state.uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reduced) state.raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onVisibility = () => {
      window.clearTimeout(state.visibleTimer);
      state.visibleTimer = window.setTimeout(() => {
        const hidden = document.hidden;
        state.running = !hidden || reduced;
        if (!hidden && !reduced && !state.raf && !state.lost) {
          state.raf = requestAnimationFrame(draw);
        }
      }, 120);
    };

    const start = () => {
      state.program = linkProgram(gl, VERT, FRAG);
      if (!state.program) return;

      state.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, state.buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );
      state.posLoc = gl.getAttribLocation(state.program, 'a_position');
      gl.enableVertexAttribArray(state.posLoc);
      gl.vertexAttribPointer(state.posLoc, 2, gl.FLOAT, false, 0, 0);

      state.uRes = gl.getUniformLocation(state.program, 'u_resolution');
      state.uTime = gl.getUniformLocation(state.program, 'u_time');
      state.uMouse = gl.getUniformLocation(state.program, 'u_mouse');

      gl.useProgram(state.program);
      gl.uniform2f(state.uRes, Math.max(1, canvas.width), Math.max(1, canvas.height));
      gl.uniform1f(state.uTime, 0);
      gl.uniform2f(state.uMouse, 0.5, 0.5);

      gl.drawArrays(gl.TRIANGLES, 0, 6); // paint one frame immediately

      state.running = true;
      if (!reduced) state.raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      window.clearTimeout(state.visibleTimer);
      cancelAnimationFrame(state.raf);
      state.raf = 0;
      state.running = false;
      if (state.buffer) {
        gl.deleteBuffer(state.buffer);
        state.buffer = null;
      }
      if (state.program) {
        gl.deleteProgram(state.program);
        state.program = null;
      }
    };

    const onContextLost = (e) => {
      e.preventDefault();
      state.lost = true;
      stop();
    };

    // Re-initialize after a real GPU/device context loss (not unmount).
    const onContextRestored = () => {
      state.lost = false;
      resize();
      start();
    };

    state.ro = new ResizeObserver(() => {
      resize();
      if (!state.lost) {
        gl.uniform2f(state.uRes, canvas.width, canvas.height);
        if (!reduced && !state.raf) state.raf = requestAnimationFrame(draw);
      }
    });
    state.ro.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    resize();
    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      state.ro.disconnect();
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      // Note: do NOT loseContext() here — React StrictMode double-invokes
      // effects in dev; killing the context on the first pass would leave the
      // second pass holding a permanently lost context. Deleting the GL objects
      // is sufficient.
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`mesh-drift ${className}`}
      aria-hidden="true"
    />
  );
}