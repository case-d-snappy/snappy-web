import { useInView } from 'framer-motion';
import { useViewEvent } from 'hooks/useViewEvent';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticsEvent } from 'utils/analytics';
import TextAnimation from 'utils/ScrollText';

import PreorderButton from './PreorderButton';

function GetStarted() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, {
    once: true,
  });

  useViewEvent(() => analyticsEvent.viewSection('get_started'), inView);

  return (
    <section className="container mx-auto flex flex-col items-center gap-10 px-5 py-30">
      <TextAnimation
        as="h2"
        text={t('get-started.title')}
        variants={{
          hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
          visible: {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            transition: { ease: 'linear' },
          },
        }}
        className="text-4xl font-extrabold text-[#F0EDE5] text-center uppercase"
      />
      <div className="flex flex-col w-full gap-2">
        <TextAnimation
          as="p"
          letterAnime={true}
          text={t('get-started.description')}
          className="text-xl mx-auto leading-5 text-[#999999] text-center"
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
        <TextAnimation
          as="p"
          letterAnime={true}
          text={t('get-started.description2')}
          className="text-xl mx-auto leading-5 text-[#999999] text-center"
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
      <PreorderButton position="bottom" />
    </section>
  );
}

export default GetStarted;
