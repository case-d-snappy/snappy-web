import { CountryCode } from 'constants/common';
import { TFunction } from 'i18next';
import { z } from 'zod';

export const preorderSchema = (isKr: boolean, t: TFunction) =>
  z.object({
    country: z.enum([CountryCode.KR, CountryCode.US]),
    phone: isKr
      ? z
          .string()
          .min(10, '10자리 이상 입력해 주세요')
          .regex(
            /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
            '유효한 휴대폰 번호를 입력해 주세요'
          )
      : z.string().optional(),
    otp: z.string().length(6, t('preorder.error.invalidOtp')),
    email: isKr ? z.string().optional() : z.string().email(),
    isAgreePrivacy: z.boolean().refine(value => value, {
      message: t('preorder.error.invalidAgreePrivacy'),
    }),
    isAgreeMarketing: z.boolean().optional(),
  });

export type PreOrderFormData = z.infer<ReturnType<typeof preorderSchema>>;
