import { useEffect, useState } from 'react';
import { PriceVariation } from 'utils/abTesting';
import { getRandomVariation } from 'utils/abTesting';

interface ABTestingResult {
  monthlyPrice: {
    formatted: string;
  };
  yearlyPrice: {
    formatted: string;
  };
  isLoading: boolean;
  currency: string;
  variation: PriceVariation;
}

export const formatPrice = (amount: number, currency: string): string => {
  if (currency === 'KRW') {
    return `₩${amount.toLocaleString('ko-KR')}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const useABTesting = (): ABTestingResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [monthlyPrice, setMonthlyPrice] = useState({ formatted: '$0' });
  const [yearlyPrice, setYearlyPrice] = useState({ formatted: '$0' });
  const variation = getRandomVariation();

  useEffect(() => {
    const isKorean = navigator.language.toLowerCase().startsWith('ko');
    const userCurrency = isKorean ? 'KRW' : 'USD';

    const prices = isKorean ? { monthly: 11900, yearly: 45000 } : { monthly: 7.99, yearly: 49.99 };

    setCurrency(userCurrency);
    setMonthlyPrice({ formatted: formatPrice(prices.monthly, userCurrency) });
    setYearlyPrice({ formatted: formatPrice(prices.yearly, userCurrency) });
    setIsLoading(false);
  }, []);

  return {
    monthlyPrice,
    yearlyPrice,
    isLoading,
    currency,
    variation,
  };
};
