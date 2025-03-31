import { useRef, useEffect, useState } from 'react';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words', // 'words' or 'letters'
  direction = 'top', // 'top' or 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  textSize = '1em', // Default text size
  onAnimationComplete,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const animatedCount = useRef(0);
  const spansRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (inView) {
      spansRef.current.forEach((span, i) => {
        setTimeout(() => {
          requestAnimationFrame(() => {
            span.style.opacity = '1';
            span.style.filter = 'blur(0px)';
            span.style.transform = 'translateY(0)';
          });
          animatedCount.current += 1;
          if (animatedCount.current === elements.length && onAnimationComplete) {
            onAnimationComplete();
          }
        }, i * delay);
      });
    }
  }, [inView, delay, elements.length, onAnimationComplete]);

  return (
    <p ref={ref} className={className} style={{ fontSize: textSize }}>
      {elements.map((char, index) => (
        <span
          key={index}
          ref={(el) => (spansRef.current[index] = el)}
          style={{
            display: 'inline-block',
            opacity: 0,
            filter: 'blur(10px)',
            transform: `translateY(${direction === 'top' ? '-50px' : '50px'})`,
            transition: 'opacity 0.5s ease-out, filter 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </p>
  );
};

export default BlurText;