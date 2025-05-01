import AppStore from 'assets/svgs/app_store.svg';
import { LanguageCode } from 'constants/comoon';
import { motion, useInView } from 'framer-motion';
import { useViewEvent } from 'hooks/useViewEvent';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticsEvent } from 'utils/analytics';

function PromotePlandy() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, {
    once: true,
  });

  useViewEvent(() => analyticsEvent.viewSection('promote_plandy'), inView);

  return (
    <section className="bg-[#344859]">
      <div className="container mx-auto flex items-center justify-center gap-10 px-5 py-30 lg:gap-20">
        <motion.img
          src="https://plandy.app/icons/apple-icon.png"
          alt="Plandy Logo"
          className="w-30 h-30 rounded-3xl cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div className="flex flex-col gap-2 items-start">
          <h2 className="text-4xl font-extrabold text-white uppercase">{t('promote-plandy.title')}</h2>
          <p className="text-xl text-[#999999]">{t('promote-plandy.description')}</p>
          <a
            role="link"
            className="relative cursor-pointer z-10 active:scale-95 transition-all duration-300 mt-4"
            aria-label="Download from App Store (Coming Soon)"
            href={`https://apps.apple.com/${i18n.language === LanguageCode.KO ? 'kr' : 'us'}/app/id6736831438`}
            target="_blank"
            onClick={() => analyticsEvent.clickDownloadPlandy()}
          >
            <AppStore className="w-40 h-auto" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default PromotePlandy;
