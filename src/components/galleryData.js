/* 10 gallery placeholder cells — swap any `gradient` for a real `image` path
   and the honeycomb cell will show the work instead of the placeholder. */

export const galleryPlaceholders = Array.from({ length: 10 }, (_, i) => ({
  id: `gallery-${i + 1}`,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  category: 'Coming Soon',
  image: null,
  placeholder: true,
  gradient: [
    'linear-gradient(135deg, #E8650A, #7a2e05)',
    'linear-gradient(135deg, #FF8C38, #B35008)',
    'linear-gradient(135deg, #4a1c05, #1a1714)',
    'linear-gradient(135deg, #B35008, #E8650A)',
    'linear-gradient(135deg, #2b1605, #7a2e05)',
    'linear-gradient(135deg, #E8650A, #FFB37E)',
    'linear-gradient(135deg, #140f0b, #B35008)',
    'linear-gradient(135deg, #7a2e05, #4a1c05)',
    'linear-gradient(135deg, #FFB37E, #E8650A)',
    'linear-gradient(135deg, #B35008, #1a1714)',
  ][i],
}));