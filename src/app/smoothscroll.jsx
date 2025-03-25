import { useEffect, useState } from "react";

const SmoothScroll = ({ components, scrollSpeed = 1500, headerOffset = 100 }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll(".pageSection");

        const disableScroll = () => {
            window.addEventListener("wheel", preventScroll, { passive: false });
            window.addEventListener("touchmove", preventScroll, { passive: false });
            window.addEventListener("keydown", preventKeyScroll, { passive: false });
            window.addEventListener("scrollDown", preventScroll, { passive: false });
            window.addEventListener("scrollUp", preventScroll, { passive: false });
            document.body.style.overflow = "hidden"; // Prevents scrolling with scrollbar
        };

        const enableScroll = () => {
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            window.removeEventListener("keydown", preventKeyScroll);
            window.removeEventListener("scrollDown", preventScroll);
            window.removeEventListener("scrollUp", preventScroll);
            document.body.style.overflow = "auto"; // Restores scrollbar scrolling
        };

        const preventScroll = (event) => event.preventDefault();

        const preventKeyScroll = (event) => {
            if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
                event.preventDefault();
            }
        };

        const scrollToPage = (index) => {
            if (index < 0 || index >= sections.length || isScrolling) return;

            setIsScrolling(true);
            setCurrentPage(index);
            disableScroll(); // Fully block scrolling

            const targetPosition =
                sections[index].getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (sections[index].offsetHeight / 2) - headerOffset;

            let start = window.scrollY;
            let startTime = performance.now();

            const animateScroll = (timestamp) => {
                let elapsedTime = timestamp - startTime;
                let progress = Math.min(elapsedTime / scrollSpeed, 1);

                window.scrollTo(0, start + (targetPosition - start) * easeInOutQuad(progress));

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    setIsScrolling(false);
                    enableScroll(); // Enable scroll only after animation completes
                }
            };

            requestAnimationFrame(animateScroll);
        };

        const handleScroll = (event) => {
            if (isScrolling) return;
            const direction = event.deltaY > 0 ? 1 : -1;
            scrollToPage(currentPage + direction);
        };

        const handleKeyDown = (event) => {
            if (isScrolling) return;
            if (event.key === "ArrowDown") scrollToPage(currentPage + 1);
            if (event.key === "ArrowUp") scrollToPage(currentPage - 1);
        };

        let touchStartY = 0;
        const handleTouchStart = (event) => {
            touchStartY = event.touches[0].clientY;
        };
        const handleTouchMove = (event) => {
            if (isScrolling) return;
            let touchEndY = event.touches[0].clientY;
            let direction = touchStartY - touchEndY > 50 ? 1 : touchStartY - touchEndY < -50 ? -1 : 0;
            if (direction !== 0) scrollToPage(currentPage + direction);
        };

        window.addEventListener("wheel", handleScroll);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            enableScroll();
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [currentPage, isScrolling, scrollSpeed, headerOffset]);

    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    return (
        <div style={{ overflow: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {components.map((Component, index) => (
                <div key={index} className="pageSection" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Component />
                </div>
            ))}
        </div>
    );
};
export default SmoothScroll;