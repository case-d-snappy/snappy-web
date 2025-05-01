import SnappyLogo from 'assets/svgs/snappy.svg';
import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';

import { PreOrderDialog } from './PreOrderDialog';
import { Sparkles } from './Sparkles';

function Intro() {
  const { t } = useTranslation();
  // const container = useRef<HTMLDivElement>(null);

  // const handleClickAppStore = (platform: 'appStore' | 'googlePlay') => {
  //   const tooltip = document.createElement('div');
  //   tooltip.className = `absolute -top-12 ${
  //     platform === 'appStore' ? 'left-5.5' : 'lg:right-5.5'
  //   } bg-black/80 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap w-fit`;
  //   tooltip.textContent = 'Coming Soon';
  //   tooltip.style.opacity = '0';
  //   tooltip.style.transform = 'translateY(20px)';

  //   container.current?.appendChild(tooltip);

  //   // Spring animation
  //   requestAnimationFrame(() => {
  //     tooltip.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  //     tooltip.style.opacity = '1';
  //     tooltip.style.transform = 'translateY(0)';
  //   });

  //   setTimeout(() => {
  //     tooltip.style.opacity = '0';
  //     tooltip.style.transform = 'translateY(-20px)';
  //     tooltip.style.transition = 'all 0.3s ease-out';

  //     setTimeout(() => tooltip.remove(), 300);
  //   }, 2700);
  // };

  return (
    <section className="w-full h-screen relative bg-[#131e28]" role="banner" aria-label="Introduction">
      <div className="relative w-full h-full max-w-screen-7xl flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-40 h-auto z-10"
        >
          <SnappyLogo className="w-full h-full" aria-hidden="true" role="logo" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl font-extrabold text-[#F0EDE5] mt-4 z-10"
        >
          {t('title')}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl text-[#999999] mt-4 text-center break-words w-full z-10"
        >
          <Trans i18nKey="description" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 z-10"
          role="complementary"
        >
          <PreOrderDialog position="top" />
        </motion.div>

        <div className="relative w-full" role="complementary">
          {/* <div
            ref={container}
            className="relative flex gap-6 mt-16 xs:flex-row flex-col justify-center items-center w-fit mx-auto"
          >
            <motion.a
              role="link"
              className="relative cursor-pointer z-10 active:scale-95 transition-all duration-300"
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
              className="relative cursor-pointer z-10 active:scale-95 transition-all duration-300"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onClick={() => handleClickAppStore('googlePlay')}
              aria-label="Download from Google Play Store (Coming Soon)"
            >
              <GooglePlay className="w-40 h-auto" aria-hidden="true" />
            </motion.a>
          </div> */}

          <Sparkles
            density={1800}
            speed={1.2}
            color="#48b6ff"
            direction="top"
            className="absolute inset-x-0 -bottom-20 z-[2] h-80 w-screen overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_80%)] before:opacity-40 after:absolute"
          />
        </div>
      </div>
    </section>
  );
}

export default Intro;
