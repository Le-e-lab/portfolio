import React, { useState, useEffect, useRef } from 'react';
import './BookLayout.css';

const BookLayout = ({ pages }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const bookPageRef = useRef(null);

    const paginate = (newDirection) => {
        if (isAnimating) return;

        const nextPage = currentPage + newDirection;
        if (nextPage >= 0 && nextPage < pages.length) {
            setDirection(newDirection);
            setCurrentPage(nextPage);
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 200); // Much faster unlock
        }
    };

    // Add scroll wheel navigation (desktop only, outside page content)
    useEffect(() => {
        // Check if device is desktop/laptop
        const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
        if (!isDesktop) return;

        let scrollTimeout;

        const handleWheel = (e) => {
            if (isAnimating) return;

            // Check if the scroll is happening inside the book page content
            const bookPage = bookPageRef.current;
            if (bookPage && bookPage.contains(e.target)) {
                // If scrolling inside the page, don't navigate
                return;
            }

            // Prevent default scroll behavior when outside the page
            e.preventDefault();

            // Clear previous timeout
            clearTimeout(scrollTimeout);

            // Set new timeout to debounce scroll events
            scrollTimeout = setTimeout(() => {
                if (e.deltaY > 0) {
                    paginate(1);
                } else if (e.deltaY < 0) {
                    paginate(-1);
                }
            }, 30); // Faster debounce
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            clearTimeout(scrollTimeout);
        };
    }, [currentPage, isAnimating]);

    // Add keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                paginate(1);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                paginate(-1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, isAnimating]);

    return (
        <div className="book-container" >
            <div className="book-wrapper">
                {/* Animated page edges */}
                <div className="page-edge left-edge"></div>
                <div className="page-edge right-edge"></div>

                {/* Direct page rendering - no animation */}
                <div
                    key={currentPage}
                    ref={bookPageRef}
                    className="book-page"
                >
                    {pages[currentPage]}
                </div>
            </div>

            {/* Navigation */}
            <div className="book-navigation" >
                <button
                    className="nav-button prev"
                    onClick={() => paginate(-1)}
                    disabled={currentPage === 0}
                >
                    ←
                </button>

                <div className="page-indicator">
                    {pages.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentPage ? 'active' : ''}`}
                            onClick={() => {
                                if (!isAnimating) {
                                    setDirection(index > currentPage ? 1 : -1);
                                    setCurrentPage(index);
                                    setIsAnimating(true);
                                    setTimeout(() => setIsAnimating(false), 200);
                                }
                            }}
                        />
                    ))}
                </div>

                <button
                    className="nav-button next"
                    onClick={() => paginate(1)}
                    disabled={currentPage === pages.length - 1}
                >
                    →
                </button>
            </div >

            {/* Page counter */}
            < div className="page-counter" >
                {currentPage + 1} / {pages.length}
            </div >

            {/* Scroll hint (desktop only) */}
            {!isAnimating && typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches && (
                <div className="scroll-hint">
                    Scroll outside the page or use arrow keys to navigate
                </div>
            )}
        </div>
    );
};

export default BookLayout;
