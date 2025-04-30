import { useEffect, useState } from 'react';
import { getPriceForVariation, getUserVariation, isKoreanUser, PriceVariation } from 'utils/abTesting';
import { getDeviceId } from 'utils/deviceId';

interface UseABTestingResult {
  deviceId: string;
  variation: PriceVariation;
  isKr: boolean;
  monthlyPrice: {
    price: number;
    currency: string;
    formatted: string;
  };
  yearlyPrice: {
    price: number;
    currency: string;
    formatted: string;
  };
  isLoading: boolean;
  currency: string;
}

export const formatPrice = (price: number, currency: string): string => {
  if (currency === 'KRW') {
    return `₩${price.toLocaleString('ko-KR')}`;
  }

  return `$${price.toFixed(2)}`;
};

export const useABTesting = (): UseABTestingResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [deviceId, setDeviceId] = useState<string>('');
  const [variation, setVariation] = useState<PriceVariation>('A');
  const [isKr, setIsKr] = useState(false);
  const [monthlyPrice, setMonthlyPrice] = useState({ price: 0, currency: 'USD', formatted: '' });
  const [yearlyPrice, setYearlyPrice] = useState({ price: 0, currency: 'USD', formatted: '' });

  useEffect(() => {
    const initializeABTesting = () => {
      const currentDeviceId = getDeviceId();
      const userVariation = getUserVariation();
      const koreanUser = isKoreanUser();

      const monthly = getPriceForVariation(userVariation, 'proMonthly');
      const yearly = getPriceForVariation(userVariation, 'proYearly');

      setDeviceId(currentDeviceId);
      setVariation(userVariation);
      setIsKr(koreanUser);

      setMonthlyPrice({
        ...monthly,
        formatted: formatPrice(monthly.price, monthly.currency),
      });

      setYearlyPrice({
        ...yearly,
        formatted: formatPrice(yearly.price, yearly.currency),
      });

      setIsLoading(false);
    };

    initializeABTesting();
  }, []);

  return {
    deviceId,
    variation,
    isKr,
    monthlyPrice,
    yearlyPrice,
    isLoading,
    currency: isKr ? 'KRW' : 'USD',
  };
};
