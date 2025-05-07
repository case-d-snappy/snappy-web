import { AuthOtpResponse } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { isKoreanUser } from 'utils/abTesting';
import { supabase } from 'utils/supabase';

interface RequestOtpVariables {
  phone: string;
  email: string;
}

export const useRequestOtp = () => {
  const { t } = useTranslation();
  const isKr = isKoreanUser();

  const signInWithOtp = async ({ phone, email }: RequestOtpVariables) => {
    const response = await supabase
      .from('preorder')
      .select('*')
      .eq(isKr ? 'phone' : 'email', isKr ? phone : email);

    if (response.data?.length && response.data.length > 0) {
      toast.error(t('preorder.error.duplicatePreorder'), {
        richColors: true,
        position: 'top-center',
      });

      throw new Error('duplicatePreorder');
    }

    return await supabase.auth.signInWithOtp(isKr ? { phone: `+82${phone.replace(/^0/, '')}` } : { email });
  };

  return useMutation<AuthOtpResponse, unknown, RequestOtpVariables>({
    mutationFn: signInWithOtp,
  });
};
