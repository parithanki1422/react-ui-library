import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Carousel({ images = [], interval = 3000, heightClass = "h-64" }) {
    if (!images || images.length === 0) return null;
    if (images.length === 1) {
        return (
            <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg">
                <img src={images[0]} alt="slide-0" className={`w-full object-cover ${heightClass}`} />
            </div>
        );
    }

    const slides = [images[images.length - 1], ...images, images[0]];
    const totalSlides = slides.length;

    const [index, setIndex] = useState(1);
    const [withTransition, setWithTransition] = useState(true);
    const [paused, setPaused] = useState(false);

    const containerRef = useRef(null);
    const autoPlayRef = useRef(null);

    const touchStartX = useRef(null);
    const touchDeltaX = useRef(0);

    const goNext = () => {
        setWithTransition(true);
        setIndex((i) => i + 1);
    };
    const goPrev = () => {
        setWithTransition(true);
        setIndex((i) => i - 1);
    };

    useEffect(() => {
        if (paused) {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
            return;
        }
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            goNext();
        }, interval);

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
        };
    }, [paused, interval, images]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleTransitionEnd = () => {
            if (index === totalSlides - 1) {
                setWithTransition(false);
                setIndex(1);
            }
            if (index === 0) {
                setWithTransition(false);
                setIndex(totalSlides - 2);
            }
        };

        el.addEventListener("transitionend", handleTransitionEnd);
        return () => el.removeEventListener("transitionend", handleTransitionEnd);
    }, [index, totalSlides]);

    useEffect(() => {
        if (!withTransition) {
            const t = requestAnimationFrame(() => {
                setTimeout(() => setWithTransition(true), 20);
            });
            return () => cancelAnimationFrame(t);
        }
    }, [withTransition]);

    const handleMouseEnter = () => setPaused(true);
    const handleMouseLeave = () => setPaused(false);

    const onTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
        setPaused(true);
    };
    const onTouchMove = (e) => {
        if (touchStartX.current == null) return;
        touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };
    const onTouchEnd = () => {
        const abs = Math.abs(touchDeltaX.current);
        const threshold = 50; 
        if (abs > threshold) {
            if (touchDeltaX.current > 0) {
                goPrev();
            } else {
                goNext();
            }
        }
        touchStartX.current = null;
        touchDeltaX.current = 0;
        setPaused(false);
    };

    const realIndex = ((index - 1) % images.length + images.length) % images.length;

    return (
        <div
            className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={containerRef}
                className={`flex ${withTransition ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${index * 100}%)` }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                {slides.map((src, i) => (
                    <div key={i} className={`min-w-full ${heightClass} flex-shrink-0`}>
                        <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            <button
                aria-label="Previous slide"
                onClick={() => {
                    goPrev();
                    if (autoPlayRef.current) {
                        clearInterval(autoPlayRef.current);
                        autoPlayRef.current = setInterval(() => goNext(), interval);
                    }
                }}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700/90"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <button
                aria-label="Next slide"
                onClick={() => {
                    goNext();
                    if (autoPlayRef.current) {
                        clearInterval(autoPlayRef.current);
                        autoPlayRef.current = setInterval(() => goNext(), interval);
                    }
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-700/90"
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="flex justify-center mt-2 space-x-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => {
                            setWithTransition(true);
                            setIndex(i + 1);
                            if (autoPlayRef.current) {
                                clearInterval(autoPlayRef.current);
                                autoPlayRef.current = setInterval(() => goNext(), interval);
                            }
                        }}
                        className={`w-3 h-3 rounded-full transition-colors ${realIndex === i ? "bg-blue-600" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
