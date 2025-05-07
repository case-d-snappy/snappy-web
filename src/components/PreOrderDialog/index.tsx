import { zodResolver } from '@hookform/resolvers/zod';
import { AuthError } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/supabase-js';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Form } from 'components/ui/form';
import { CountryCode } from 'constants/common';
import { useRequestOtp } from 'hooks/useRequestOtp';
import { useUserPreorder } from 'hooks/useUserPreorder';
import { useVerifyOtp } from 'hooks/useVerifyOtp';
import { lazy, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { getUserVariation, isKoreanUser } from 'utils/abTesting';
import { analyticsEvent } from 'utils/analytics';

import { AgreementFields } from './AgreementFields';
import { ContactInput } from './ContactInput';
import { type PreOrderFormData, preorderSchema } from './varidation';

const OtpInput = lazy(() => import('./OtpInput').then(module => ({ default: module.OtpInput })));

interface PreOrderDialogProps {
  position: 'top' | 'bottom';
}

export function PreOrderDialog({ position }: PreOrderDialogProps) {
  const { t } = useTranslation();
  const isKr = isKoreanUser();
  const variation = getUserVariation();

  const { isPending: isRequestOtpPending, mutate: requestOtp } = useRequestOtp();
  const { isPending: isVerifyOtpPending, mutate: verifyOtp } = useVerifyOtp();
  const { isPending: isUserPreorderPending, mutate: userPreorder } = useUserPreorder();

  const form = useForm<PreOrderFormData>({
    mode: 'onChange',
    resolver: zodResolver(preorderSchema(isKr, t)),
    defaultValues: {
      email: '',
      phone: '',
      country: isKr ? CountryCode.KR : CountryCode.US,
      isAgreePrivacy: true,
      isAgreeMarketing: true,
    },
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  const isPending = isRequestOtpPending || isVerifyOtpPending || isUserPreorderPending;

  const handleOpenChange = (open: boolean) => {
    setOpenDialog(open);
    form.reset();

    if (open) {
      analyticsEvent.clickPreorderButton(position);
    } else {
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setIsTimeout(false);
    }
  };

  const handleRequestOtp = () => {
    if (isTimeout) {
      setIsTimeout(false);
    }

    const { email = '', phone = '' } = form.getValues();
    requestOtp(
      { phone, email },
      {
        onSuccess: ({ error }) => {
          if (error) {
            handleError(error, 'preorder.error.title', 'preorder.error.description');
            return;
          }

          setIsOtpSent(true);
          form.setValue('otp', '');
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    const { email = '', phone = '', otp = '' } = form.getValues();
    verifyOtp(
      { phone, email, otp },
      {
        onSuccess: ({ data, error }) => {
          if (error) {
            handleError(error, 'preorder.error.verifyOtp', 'preorder.error.description');
            form.setValue('otp', '', { shouldValidate: true });
            return;
          }

          if (data) {
            toast.success(t('preorder.success.verifiedOtp'), {
              position: 'top-center',
            });
            setIsOtpVerified(true);
          }
        },
      }
    );
  };

  const onSubmit = ({ email = '', phone = '', isAgreeMarketing = false }: PreOrderFormData) => {
    if (!form.formState.isValid || !isOtpVerified || isPending) {
      return;
    }

    analyticsEvent.submitPreorderForm({
      contactType: isKr ? 'phone' : 'email',
      isAgreeMarketing,
      value: isKr ? phone : email,
      variation,
    });

    userPreorder(
      { email, phone, variation, is_agree_marketing: isAgreeMarketing },
      {
        onSuccess: ({ status, error }) => {
          if (error) {
            handleError(error, 'preorder.error.title', isAgreeMarketing ? 'preorder.success.agreemarketing' : '');
            return;
          }

          if (status === 201) {
            toast.success(t('preorder.success.title'), {
              richColors: true,
              position: 'top-center',
              description: isAgreeMarketing ? t('preorder.success.agreemarketing') : '',
            });
            setOpenDialog(false);
            form.reset();
          }
        },
      }
    );
  };

  const handleError = (error: AuthError | PostgrestError | null, titleKey: string, descriptionKey: string) => {
    console.error(error);
    toast.error(t(titleKey), {
      richColors: true,
      position: 'top-center',
      description:
        error?.code === 'over_sms_send_rate_limit' || error?.code === 'over_email_send_rate_limit'
          ? t(descriptionKey)
          : error?.message,
    });
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#070e41] hover:bg-[#FF2768] px-10 text-xl text-white font-semibold backdrop-blur-3xl duration-300">
            {t('getStarted.button')}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left">{t('preorder.title')}</DialogTitle>
          <DialogDescription className="text-left">
            <Trans i18nKey="preorder.description" components={{ strong: <strong className="text-highlight" /> }} />
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id="preorder-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <ContactInput
              isPending={isPending}
              form={form}
              isOtpSent={isOtpSent}
              setIsOtpSent={setIsOtpSent}
              isOtpVerified={isOtpVerified}
              setIsOtpVerified={setIsOtpVerified}
              handleRequestOtp={handleRequestOtp}
              isTimeout={isTimeout}
            />
            {isOtpSent && (
              <OtpInput
                isPending={isPending}
                form={form}
                isOtpVerified={isOtpVerified}
                setIsOtpVerified={setIsOtpVerified}
                isTimeout={isTimeout}
                setIsTimeout={setIsTimeout}
                handleVerifyOtp={handleVerifyOtp}
              />
            )}
            <AgreementFields form={form} />
            <Button
              type={isOtpVerified ? 'submit' : 'button'}
              form="preorder-form"
              disabled={!form.formState.isValid || !isOtpVerified || isPending}
              className="w-full bg-[#FF2768] hover:bg-[#FF2768]/90 text-white font-bold text-lg h-13 cursor-pointer mt-4"
            >
              {t('preorder.button')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
