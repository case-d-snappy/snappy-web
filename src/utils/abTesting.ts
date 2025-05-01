import { CountryCode, LanguageCode } from 'constants/common';

export type PriceVariation = 'A' | 'B' | 'C';
export type SubscriptionPeriod = 'proMonthly' | 'proYearly';

interface PriceConfig {
  proMonthly: {
    [CountryCode.KR]: number;
    [CountryCode.US]: number;
  };
  proYearly: {
    [CountryCode.KR]: number;
    [CountryCode.US]: number;
  };
}

interface PriceVariationConfig {
  [key: string]: PriceConfig;
}

const VARIATION_KEY = 'price_variation';
const VARIATIONS: PriceVariation[] = ['A', 'B', 'C'];

const PRICE_CONFIG: PriceVariationConfig = {
  A: {
    proMonthly: {
      [CountryCode.KR]: 11900, // ₩11,900
      [CountryCode.US]: 7.99, // $7.99
    },
    proYearly: {
      [CountryCode.KR]: 45000, // ₩45,000
      [CountryCode.US]: 49.99, // $49.99
    },
  },
  B: {
    proMonthly: {
      [CountryCode.KR]: 14900, // ₩14,900
      [CountryCode.US]: 9.99, // $9.99
    },
    proYearly: {
      [CountryCode.KR]: 59000, // ₩59,000
      [CountryCode.US]: 59.99, // $59.99
    },
  },
  C: {
    proMonthly: {
      [CountryCode.KR]: 17900, // ₩17,900
      [CountryCode.US]: 12.99, // $12.99
    },
    proYearly: {
      [CountryCode.KR]: 69000, // ₩69,000
      [CountryCode.US]: 69.99, // $69.99
    },
  },
};

export const isKoreanUser = (): boolean => {
  const userLanguage = navigator.language.toLowerCase();

  return (
    userLanguage.startsWith(LanguageCode.KO) ||
    userLanguage.includes(CountryCode.KR) ||
    Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Seoul'
  );
};

export const getRandomVariation = (): PriceVariation => {
  const randomIndex = Math.floor(Math.random() * VARIATIONS.length);

  return VARIATIONS[randomIndex];
};

export const getUserVariation = (): PriceVariation => {
  const storedVariation = localStorage.getItem(VARIATION_KEY) as PriceVariation;

  if (!storedVariation) {
    const newVariation = getRandomVariation();
    localStorage.setItem(VARIATION_KEY, newVariation);

    return newVariation;
  }

  return storedVariation;
};

export const getPriceForVariation = (
  variation: PriceVariation,
  period: SubscriptionPeriod
): { price: number; currency: string } => {
  const isKr = isKoreanUser();
  const price = PRICE_CONFIG[variation][period][isKr ? CountryCode.KR : CountryCode.US];

  return {
    price,
    currency: isKr ? 'KRW' : 'USD',
  };
};
