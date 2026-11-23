import { motion, useScroll, useSpring } from 'motion/react';

const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <div
      className='fixed top-16 left-0 right-0 z-40 h-[2px] bg-transparent pointer-events-none'
      aria-hidden='true'
    >
      <motion.div
        style={{ scaleX }}
        className='h-full w-full bg-accent origin-left'
      />
    </div>
  );
};

export default ReadingProgress;
