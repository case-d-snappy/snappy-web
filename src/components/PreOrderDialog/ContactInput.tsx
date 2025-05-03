import { Button } from 'components/ui/button';
import { FormControl, FormMessage } from 'components/ui/form';
import { FormLabel } from 'components/ui/form';
import { FormItem } from 'components/ui/form';
import { FormField } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { type UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { isKoreanUser } from 'utils/abTesting';

import { type PreOrderFormData } from './varidation';

interface ContactInputProps {
  isPending: boolean;
  form: UseFormReturn<PreOrderFormData>;
  isOtpSent: boolean;
  setIsOtpSent: (isOtpSent: boolean) => void;
  isOtpVerified: boolean;
  setIsOtpVerified: (isOtpVerified: boolean) => void;
  isTimeout: boolean;
  handleRequestOtp: () => void;
}

export const ContactInput = ({
  isPending,
  form,
  isOtpSent,
  setIsOtpSent,
  isOtpVerified,
  setIsOtpVerified,
  isTimeout,
  handleRequestOtp,
}: ContactInputProps) => {
  const { t } = useTranslation();
  const isKr = isKoreanUser();

  return (
    <div className="flex items-start gap-2 w-full">
      {isKr ? (
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel>휴대폰 번호</FormLabel>
              <FormControl>
                <Input
                  id="phone"
                  value={field.value || ''}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, '');
                    field.onChange(value.slice(0, 11));
                    if (isOtpSent) {
                      setIsOtpSent(false);
                    }
                    if (isOtpVerified) {
                      setIsOtpVerified(false);
                    }
                  }}
                  placeholder="01012345678"
                  type="text"
                  pattern="\d{0,11}"
                  inputMode="numeric"
                  maxLength={11}
                />
              </FormControl>
              {form.formState.errors.phone && (
                <FormMessage className="text-sm text-red-500">{form.formState.errors.phone.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  id="email"
                  {...field}
                  onChange={e => {
                    const value = e.target.value.replace(/\s/g, '');
                    field.onChange(value);
                    if (isOtpSent) {
                      setIsOtpSent(false);
                    }
                    if (isOtpVerified) {
                      setIsOtpVerified(false);
                    }
                  }}
                />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage className="text-sm text-red-500">{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
      )}
      <Button
        type={isOtpSent ? 'button' : 'submit'}
        onClick={handleRequestOtp}
        className="text-sm whitespace-nowrap flex items-center h-9 px-4 text-white font-semibold bg-[#344859] rounded-md cursor-pointer mt-5.5"
        disabled={
          (isKr
            ? (form.watch('phone')?.length ?? 0) < 10
            : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.watch('email') || '')) ||
          !form.watch('isAgreePrivacy') ||
          (isOtpSent && !isTimeout) ||
          isOtpVerified ||
          isPending
        }
      >
        {isOtpSent ? t('preorder.resend') : t('preorder.request')}
      </Button>
    </div>
  );
};
