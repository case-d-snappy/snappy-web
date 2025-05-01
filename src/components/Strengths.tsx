import { IMAGE_URL } from 'constants/comoon';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useViewEvent } from 'hooks/useViewEvent';
import { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { analyticsEvent } from 'utils/analytics';
import TextAnimation from 'utils/ScrollText';
import { cn } from 'utils/styles';

function Strengths() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, {
    once: true,
  });

  useViewEvent(() => analyticsEvent.viewSection('strengths'), inView);

  return (
    <section ref={containerRef} className="container mx-auto flex flex-col gap-40 px-5 py-30">
      <div className="flex flex-col gap-6 items-center">
        <TextAnimation
          as="h2"
          text={t('strengths.title')}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: { ease: 'linear' },
            },
          }}
          className="text-4xl font-extrabold text-center text-white uppercase"
        />
        <TextAnimation
          as="p"
          letterAnime={true}
          text={t('strengths.description')}
          className="text-xl w-full mx-auto lowercase leading-5 text-[#999999] text-center"
          variants={{
            hidden: { filter: 'blur(4px)', opacity: 0, y: 20 },
            visible: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          }}
        />
      </div>

      <div
        className={cn(
          'w-full h-full max-w-screen-2xl mx-auto flex flex-col gap-20 items-center justify-between',
          'lg:flex-row lg:gap-10'
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center lg:items-start"
        >
          <h3 className="text-5xl font-extrabold text-[#F0EDE5] text-center lg:text-left leading-14">
            <Trans i18nKey="strengths.first.title" />
          </h3>
          <h4 className="text-2xl text-[#999999] text-center lg:text-left">{t('strengths.first.description')}</h4>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full xs:w-auto xs:max-h-[858px]"
          src={`${IMAGE_URL}/${i18n.language}/mock_day_picture_screen.png`}
          alt="Day Card"
        />
      </div>

      <div
        className={cn(
          'w-full h-full max-w-screen-2xl mx-auto flex flex-col gap-20 items-center justify-between',
          'lg:flex-row-reverse lg:gap-10'
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center lg:items-start"
        >
          <h3 className="text-5xl font-extrabold text-[#F0EDE5] text-center lg:text-left leading-14">
            <Trans i18nKey="strengths.second.title" />
          </h3>
          <h4 className="text-2xl text-[#999999] text-center lg:text-left">{t('strengths.second.description')}</h4>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full xs:w-auto xs:max-h-[858px]"
          src={`${IMAGE_URL}/${i18n.language}/mock_day_text_screen.png`}
          alt="Detail Card"
        />
      </div>

      <div
        className={cn(
          'w-full h-full max-w-screen-2xl mx-auto flex flex-col gap-20 items-center justify-between',
          'lg:flex-row lg:gap-10'
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 items-center lg:items-start"
        >
          <h3 className="text-5xl font-extrabold text-[#F0EDE5] text-center lg:text-left leading-14">
            {t('strengths.third.title')}
          </h3>
          <h4 className="text-2xl text-[#999999] text-center lg:text-left">{t('strengths.third.description')}</h4>
        </motion.div>
        <motion.img
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full xs:w-auto xs:max-h-[858px]"
          src={`${IMAGE_URL}/${i18n.language}/mock_calender_screen.png`}
          alt="Calender Screen"
        />
      </div>
    </section>
  );
}

export default Strengths;
