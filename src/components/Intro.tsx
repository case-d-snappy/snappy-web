import AppStore from 'assets/svgs/app_store.svg';
import GooglePlay from 'assets/svgs/google_play.svg';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'utils/Sparkles';

const Intro = () => {
  const container = useRef<HTMLDivElement>(null);

  const handleClickAppStore = (platform: 'appStore' | 'googlePlay') => {
    const tooltip = document.createElement('div');
    tooltip.className = `absolute -top-12 left-6 lg:translate-x-0 ${
      platform === 'appStore'
        ? 'lg:left-1/2 -lg:translate-x-[calc(50%+90px)]'
        : 'lg:right-1/2 lg:translate-x-[calc(50%+90px)]'
    } bg-black/80 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap`;
    tooltip.textContent = 'Coming Soon';
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(20px)';

    container.current?.appendChild(tooltip);

    // Spring animation
    requestAnimationFrame(() => {
      tooltip.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateY(-20px)';
      tooltip.style.transition = 'all 0.3s ease-out';

      setTimeout(() => tooltip.remove(), 300);
    }, 2700);
  };

  return (
    <section className="w-full h-screen relative" role="banner" aria-label="Introduction">
      <div className="relative w-full h-full max-w-screen-7xl flex flex-col items-center justify-center">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          src="/snappy.svg"
          alt="Snappy Logo"
          className="w-40 h-auto z-10"
          loading="eager"
        />

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl font-extrabold text-[#F0EDE5] mt-4 z-10"
        >
          Snappy
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl text-[#999999] mt-4 text-center break-words w-full z-10"
        >
          Draw picture diary for everyday moments special
        </motion.h2>

        <div
          ref={container}
          className="relative flex gap-6 mt-16 xs:flex-row flex-col justify-center items-center"
          role="complementary"
        >
          <motion.a
            role="link"
            className="relative cursor-pointer z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={() => handleClickAppStore('appStore')}
            aria-label="Download from App Store (Coming Soon)"
          >
            <AppStore className="w-40 h-auto" aria-hidden="true" />
          </motion.a>
          <motion.a
            role="link"
            className="relative cursor-pointer z-10"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={() => handleClickAppStore('googlePlay')}
            aria-label="Download from Google Play Store (Coming Soon)"
          >
            <GooglePlay className="w-40 h-auto" aria-hidden="true" />
          </motion.a>

          <div
            className="absolute -bottom-14 z-[2] h-[400px] w-screen overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute"
            aria-hidden="true"
          >
            <Sparkles
              density={1800}
              speed={1.2}
              color="#48b6ff"
              direction="top"
              className="absolute inset-x-0 bottom-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
