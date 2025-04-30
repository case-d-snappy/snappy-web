export type PriceVariation = 'A' | 'B' | 'C';
export type SubscriptionPeriod = 'proMonthly' | 'proYearly';

interface PriceConfig {
  proMonthly: {
    kr: number;
    global: number;
  };
  proYearly: {
    kr: number;
    global: number;
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
      kr: 11900, // ₩11,900
      global: 7.99, // $7.99
    },
    proYearly: {
      kr: 45000, // ₩45,000
      global: 49.99, // $49.99
    },
  },
  B: {
    proMonthly: {
      kr: 14900, // ₩14,900
      global: 9.99, // $9.99
    },
    proYearly: {
      kr: 59000, // ₩59,000
      global: 59.99, // $59.99
    },
  },
  C: {
    proMonthly: {
      kr: 17900, // ₩17,900
      global: 12.99, // $12.99
    },
    proYearly: {
      kr: 69000, // ₩69,000
      global: 69.99, // $69.99
    },
  },
};

export const isKoreanUser = (): boolean => {
  const userLanguage = navigator.language.toLowerCase();

  return (
    userLanguage.startsWith('ko') ||
    userLanguage.includes('kr') ||
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
  const price = PRICE_CONFIG[variation][period][isKr ? 'kr' : 'global'];

  return {
    price,
    currency: isKr ? 'KRW' : 'USD',
  };
};
