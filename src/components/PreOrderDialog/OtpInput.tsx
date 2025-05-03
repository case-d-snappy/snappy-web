import { Button } from 'components/ui/button';
import { FormMessage } from 'components/ui/form';
import { FormControl } from 'components/ui/form';
import { FormLabel } from 'components/ui/form';
import { FormField } from 'components/ui/form';
import { FormItem } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { isKoreanUser } from 'utils/abTesting';

import { CountdownTimer } from './CountdownTimer';
import { PreOrderFormData } from './varidation';

interface OtpInputProps {
  isPending: boolean;
  form: UseFormReturn<PreOrderFormData>;
  isOtpVerified: boolean;
  setIsOtpVerified: (isOtpVerified: boolean) => void;
  isTimeout: boolean;
  setIsTimeout: (isTimeout: boolean) => void;
  handleVerifyOtp: () => void;
}

export const OtpInput = ({
  isPending,
  form,
  isOtpVerified,
  setIsOtpVerified,
  isTimeout,
  setIsTimeout,
  handleVerifyOtp,
}: OtpInputProps) => {
  const { t } = useTranslation();
  const isKr = isKoreanUser();

  return (
    <div className="flex items-start gap-2 w-full">
      <FormField
        name="otp"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel>{t('preorder.verificationCode')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('preorder.verificationCodeInput')}
                maxLength={6}
                onChange={e => {
                  if (isOtpVerified) {
                    setIsOtpVerified(false);
                  }
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  field.onChange(value);
                  if (value.length === 6) {
                    handleVerifyOtp();
                  }
                }}
                value={field.value || ''}
              />
            </FormControl>
            {!isOtpVerified && !isTimeout && <CountdownTimer minutes={isKr ? 3 : 60} setIsTimeout={setIsTimeout} />}
            {form.formState.errors.otp && (
              <FormMessage className="text-sm text-red-500">{t('preorder.error.invalidOtp')}</FormMessage>
            )}
          </FormItem>
        )}
      />
      <Button
        type={isOtpVerified ? 'button' : 'submit'}
        className="text-sm whitespace-nowrap flex items-center h-9 px-4 text-white font-semibold bg-[#344859] rounded-md cursor-pointer mt-5.5"
        onClick={handleVerifyOtp}
        disabled={isOtpVerified || isTimeout || isPending}
      >
        {t('common.confirm')}
      </Button>
    </div>
  );
};
