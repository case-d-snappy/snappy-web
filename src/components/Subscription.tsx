import StarBold from 'assets/svgs/star_bold.svg';
import { motion, useInView } from 'framer-motion';
import { formatPrice, useABTesting } from 'hooks/useABTesting';
import { useViewEvent } from 'hooks/useViewEvent';
import React, { MouseEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { analyticsEvent } from 'utils/analytics';
import TextAnimation from 'utils/ScrollText';
import { cn } from 'utils/styles';

interface PlanOption {
  id: string;
  isPopular?: boolean;
}

const PLANS: PlanOption[] = [{ id: 'free' }, { id: 'proMonthly' }, { id: 'proYearly', isPopular: true }];

function Subscription() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, {
    once: true,
  });

  const { monthlyPrice, yearlyPrice, isLoading, currency } = useABTesting();

  useViewEvent(() => analyticsEvent.viewSection('subscription'), inView);

  return (
    <section ref={containerRef} aria-labelledby="subscription-title" className="bg-[#344859]">
      <div className="container mx-auto flex flex-col gap-10 px-5 py-30 lg:gap-20">
        <div className="flex flex-col gap-6 items-center">
          <TextAnimation
            as="h2"
            text={t('subscription.title')}
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
            text={t('subscription.description')}
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

        {!isLoading && (
          <div className="mt-16 grid gap-8 lg:grid-cols-3" role="list">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: 'easeOut',
                }}
                role="listitem"
              >
                <PlanCard
                  plan={plan}
                  price={
                    plan.id === 'free'
                      ? formatPrice(0, currency)
                      : plan.id === 'proMonthly'
                        ? monthlyPrice.formatted
                        : yearlyPrice.formatted
                  }
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

interface PlanCardProps {
  plan: PlanOption;
  price: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, price }) => {
  const { t } = useTranslation();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setOverlayColor({ x, y });
  };

  const boxWrapper = useRef(null);
  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubscribeClick = () => {
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      ref={boxWrapper}
      onMouseMove={handleMouseMove}
      className={cn(
        'w-full max-w-[422px] h-full mx-auto rounded-3xl border-transparent',
        '[background:linear-gradient(45deg,#080b11,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]',
        plan.isPopular && 'border animate-border'
      )}
      role="article"
      aria-label={`${t(`subscription.plans.${plan.id}.name`)} subscription option`}
    >
      <div
        className="relative z-10 px-6 pt-8 pb-9 rounded-3xl w-full h-full mx-auto flex flex-col gap-2 items-stretch"
        style={{
          background: `radial-gradient(250px circle at ${overlayColor.x}px ${overlayColor.y}px,rgba(16, 169, 255, 0.137),transparent 80%)`,
        }}
      >
        {plan.isPopular && (
          <motion.div
            className="w-fit absolute top-6 right-5"
            whileInView={{
              rotate: [0, -3, 3, -3, 0],
            }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1,
            }}
            role="status"
            aria-label="Popular plan badge"
          >
            <div className="pl-2.5 pr-3.5 py-2 rounded-full bg-[#FF2768] flex items-center gap-2 w-full shadow-lg">
              <StarBold className="min-w-4 w-5 h-4 text-white" aria-hidden="true" />
              <span className="text-sm font-bold text-white">POPULAR</span>
            </div>
          </motion.div>
        )}

        <h3 className={cn('text-xl font-bold tracking-tight', plan.isPopular ? 'text-[#10A9FF]' : 'text-[#F0EDE5]')}>
          {t(`subscription.plans.${plan.id}.name`)}
        </h3>

        <div className="mt-3 flex items-baseline" aria-label={`${plan.id} ${price}`}>
          <span className="text-5xl font-bold text-white">{price}</span>
          <span className="ml-2 text-[#999999]">/ {t(`subscription.plans.${plan.id}.interval`)}</span>
        </div>

        <p className="mt-2 text-[#999999] min-h-12">{t(`subscription.plans.${plan.id}.description`)}</p>

        <div className="relative">
          <button
            type="button"
            onClick={handleSubscribeClick}
            className={cn(
              'mt-8 w-full py-3 px-6 rounded-lg font-semibold hover:bg-[#344859] duration-300 cursor-pointer',
              plan.isPopular ? 'bg-[#10A9FF] text-white' : 'bg-white text-[#131E28] hover:text-[#F0EDE5]'
            )}
            aria-label={t(plan.id === 'free' ? 'subscription.start-for-free' : 'subscription.start-free-trial')}
          >
            {t(plan.id === 'free' ? 'subscription.start-for-free' : 'subscription.start-free-trial')}
          </button>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-16 bg-black text-white px-4 py-2 rounded-lg whitespace-nowrap"
              role="alert"
            >
              Coming Soon!
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-4 my-6">
          <div className="h-[1px] flex-1 bg-[#373737]" aria-hidden="true"></div>
          <h4 className="text-[#373737] text-sm font-medium">STAND OUR FEATURES</h4>
          <div className="h-[1px] flex-1 bg-[#373737]" aria-hidden="true"></div>
        </div>

        <ul className="space-y-4.5 flex-grow" role="list" aria-label="Plan features">
          {t(`subscription.plans.${plan.id}.features`, { returnObjects: true }).map(
            (feature: string, index: number) => (
              <li key={index} className="flex items-start-start gap-1 text-[#F0EDE5] text-base">
                <svg
                  className={cn('min-w-6 w-6 h-6 mr-2', plan.isPopular ? 'text-[#FF8577]' : 'text-[#29EEC7]')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default Subscription;
