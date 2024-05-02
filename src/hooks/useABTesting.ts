import { CurrencyCode } from 'constants/common';
import { useEffect, useState } from 'react';
import { getPriceForVariation, getUserVariation, PriceVariation } from 'utils/abTesting';

interface ABTestingResult {
  isLoading: boolean;
  formatedMonthlyPrice: string;
  formatedYearlyPrice: string;
  currency: (typeof CurrencyCode)[keyof typeof CurrencyCode];
  variation: PriceVariation;
}

export const formatPrice = (amount: number, currency: string): string => {
  if (currency === 'KRW') {
    return `₩${amount.toLocaleString('ko-KR')}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const useABTesting = (): ABTestingResult => {
  const variation = getUserVariation();

  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState<(typeof CurrencyCode)[keyof typeof CurrencyCode]>(CurrencyCode.US);
  const [formatedMonthlyPrice, setFormatedMonthlyPrice] = useState('$0');
  const [formatedYearlyPrice, setFormatedYearlyPrice] = useState('$0');

  useEffect(() => {
    const monthlyPriceData = getPriceForVariation(variation, 'proMonthly');
    const yearlyPriceData = getPriceForVariation(variation, 'proYearly');

    setFormatedMonthlyPrice(formatPrice(monthlyPriceData.price, monthlyPriceData.currency));
    setFormatedYearlyPrice(formatPrice(yearlyPriceData.price, yearlyPriceData.currency));
    setCurrency(monthlyPriceData.currency);
    setIsLoading(false);
  }, [variation]);

  return {
    isLoading,
    formatedMonthlyPrice,
    formatedYearlyPrice,
    currency,
    variation,
  };
};
