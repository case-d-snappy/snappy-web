import { AuthResponse, VerifyOtpParams } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { isKoreanUser } from 'utils/abTesting';
import { supabase } from 'utils/supabase';

interface VerifyOtpVariables {
  phone: string;
  email: string;
  otp: string;
}

export const useVerifyOtp = () => {
  const isKr = isKoreanUser();

  const verifyOtp = async ({ phone, email, otp }: VerifyOtpVariables) => {
    const otpPayload: VerifyOtpParams = isKr
      ? {
          phone: `+82${phone.replace(/^0/, '')}`,
          token: otp,
          type: 'sms',
        }
      : {
          email: email,
          token: otp,
          type: 'email',
        };

    return supabase.auth.verifyOtp(otpPayload);
  };

  return useMutation<AuthResponse, unknown, VerifyOtpVariables>({
    mutationFn: verifyOtp,
  });
};
