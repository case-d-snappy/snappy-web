import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/button';
import { Checkbox } from 'components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { CountryCode } from 'constants/common';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { getUserVariation, isKoreanUser } from 'utils/abTesting';
import { analyticsEvent } from 'utils/analytics';
import { z } from 'zod';

const schema = z.object({
  country: z.enum([CountryCode.KR, CountryCode.US]),
  phone: isKoreanUser()
    ? z
        .string()
        .min(10, '10자리 이상 입력해 주세요')
        .regex(
          /^(?:\+?\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
          '유효한 휴대폰 번호를 입력해 주세요'
        )
    : z.string().optional(),
  email: isKoreanUser() ? z.string().email().optional() : z.string().email(),
  agreePrivacy: z.boolean().refine(value => value, {
    message: '개인정보 수집 및 이용에 동의해주세요',
  }),
  agreeMarketing: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface PreOrderDialogProps {
  position: 'top' | 'bottom';
}

export function PreOrderDialog({ position }: PreOrderDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: isKoreanUser() ? CountryCode.KR : CountryCode.US,
      agreePrivacy: false,
      agreeMarketing: false,
    },
  });
  const variation = getUserVariation();
  const country = form.watch('country');

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    form.reset();

    if (open) {
      analyticsEvent.clickPreorderButton(position);
    }
  };

  const onSubmit = (data: FormData) => {
    analyticsEvent.submitPreorderForm({
      contactType: country === CountryCode.KR ? 'phone' : 'email',
      allowMarketing: data.agreeMarketing ?? false,
      value: (country === CountryCode.KR ? data.phone : data.email) ?? '',
      variation,
    });

    console.log('제출 데이터', data);
    toast.success(t('preorder.success.title'), {
      position: 'top-center',
      description: data.agreeMarketing ? t('preorder.success.agreemarketing') : '',
      action: {
        label: t('common.confirm'),
        onClick: () => {
          setOpen(false);
        },
      },
    });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* 전화번호 또는 이메일 */}
            {country === CountryCode.KR ? (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>휴대폰번호</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        value={field.value || ''}
                        onChange={field.onChange}
                        onInput={e => {
                          const input = e.target as HTMLInputElement;
                          input.value = input.value.replace(/\D/g, '').slice(0, 11);
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
                      <Input id="email" type="email" placeholder="user@example.com" {...field} />
                    </FormControl>
                    {form.formState.errors.email && (
                      <FormMessage className="text-sm text-red-500">{form.formState.errors.email.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}

            {/* 약관 동의 */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="agreePrivacy"
                render={({ field }) => (
                  <FormItem className="flex cursor-pointer w-fit">
                    <FormLabel hidden>Agree Privacy</FormLabel>
                    <FormControl>
                      <Checkbox
                        id="agreePrivacy"
                        className="mt-0.5 cursor-pointer"
                        checked={field.value}
                        onClick={() => field.onChange(!field.value)}
                      />
                    </FormControl>
                    <FormDescription className="text-sm" onClick={() => field.onChange(!field.value)}>
                      [필수] 개인정보 수집 및 이용에 동의합니다
                    </FormDescription>
                    {form.formState.errors.agreePrivacy && (
                      <FormMessage className="text-sm text-red-500">
                        {form.formState.errors.agreePrivacy.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeMarketing"
                render={({ field }) => (
                  <FormItem className="flex cursor-pointer w-fit">
                    <FormLabel hidden>Agree Marketing</FormLabel>
                    <FormControl>
                      <Checkbox
                        id="agreeMarketing"
                        className="mt-0.5 cursor-pointer"
                        checked={field.value}
                        onClick={() => field.onChange(!field.value)}
                      />
                    </FormControl>
                    <FormDescription className="text-sm" onClick={() => field.onChange(!field.value)}>
                      [선택] 서비스 출시 알림 및 이벤트 수신에 동의합니다
                    </FormDescription>
                  </FormItem>
                )}
              />
              <p className="text-xs text-gray-500 mt-8">
                본 사전예약은 정식 서비스 출시 시점에 안내 문자 또는 이메일을 통해 알림을 드리며, 서비스 출시 일정은
                변경될 수 있습니다.
              </p>
            </div>

            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="w-full bg-[#FF2768] hover:bg-[#FF2768]/90 text-white font-bold text-lg h-13 cursor-pointer mt-4"
            >
              사전예약 신청
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
