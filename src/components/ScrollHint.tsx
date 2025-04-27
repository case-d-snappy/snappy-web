import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function ScrollHint() {
  const scrollHint = useRef<HTMLDivElement>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(timeoutId.current as NodeJS.Timeout);

      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

      if (scrollHint.current) {
        if (isAtBottom) {
          scrollHint.current.style.opacity = '0';
          scrollHint.current.style.visibility = 'hidden';
          return;
        }

        scrollHint.current.style.opacity = '0';
        scrollHint.current.style.transition = 'opacity 0.5s ease-out';

        setTimeout(() => {
          if (scrollHint.current) {
            scrollHint.current.style.visibility = 'hidden';
          }
        }, 500);
      }

      timeoutId.current = setTimeout(() => {
        if (scrollHint.current && !isAtBottom) {
          scrollHint.current.style.visibility = 'visible';
          scrollHint.current.style.opacity = '0.5';
          scrollHint.current.style.transition = 'opacity 0.5s ease-in';
        }
      }, 500);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={scrollHint}
        id="scroll-hint"
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-center cursor-pointer flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs text-gray-400 mb-2.5">Scroll</div>
        <div className="w-7.5 h-12.5 border-2 border-gray-300 rounded-3xl relative">
          <motion.div
            className="w-2 h-2 bg-gray-300 absolute rounded-full left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
