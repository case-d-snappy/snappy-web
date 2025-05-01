import { useTranslation } from 'react-i18next';
import { analyticsEvent } from 'utils/analytics';

interface PreorderButtonProps {
  position: 'top' | 'bottom';
}

export default function PreorderButton({ position }: PreorderButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
      onClick={() => analyticsEvent.clickPreorderButton(position)}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-[#070e41] hover:bg-[#FF2768] px-10 text-xl font-medium text-white backdrop-blur-3xl duration-300">
        {t('get-started.button')}
      </span>
    </button>
  );
}
