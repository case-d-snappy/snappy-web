import { Checkbox } from 'components/ui/checkbox';
import { FormDescription, FormMessage } from 'components/ui/form';
import { FormControl } from 'components/ui/form';
import { FormLabel } from 'components/ui/form';
import { FormItem } from 'components/ui/form';
import { FormField } from 'components/ui/form';
import { type UseFormReturn } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { type PreOrderFormData } from './varidation';

interface AgreementFieldsProps {
  form: UseFormReturn<PreOrderFormData>;
}

export const AgreementFields = ({ form }: AgreementFieldsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name="isAgreePrivacy"
        render={({ field }) => (
          <div>
            <FormItem className="flex cursor-pointer">
              <FormLabel hidden>Agree Privacy</FormLabel>
              <FormControl>
                <Checkbox
                  id="isAgreePrivacy"
                  className="mt-0.5 cursor-pointer"
                  checked={field.value}
                  onClick={() => field.onChange(!field.value)}
                />
              </FormControl>
              <div>
                <FormDescription className="text-sm" onClick={() => field.onChange(!field.value)}>
                  <Trans
                    i18nKey="preorder.agreePrivacy"
                    components={{ strong: <strong className="text-highlight" /> }}
                  />
                </FormDescription>
                {form.formState.errors.isAgreePrivacy && (
                  <FormMessage className="text-sm text-red-500 mt-1">
                    {form.formState.errors.isAgreePrivacy.message}
                  </FormMessage>
                )}
              </div>
            </FormItem>
          </div>
        )}
      />
      <FormField
        control={form.control}
        name="isAgreeMarketing"
        render={({ field }) => (
          <FormItem className="flex cursor-pointer">
            <FormLabel hidden>Agree Marketing</FormLabel>
            <FormControl>
              <Checkbox
                id="isAgreeMarketing"
                className="mt-0.5 cursor-pointer"
                checked={field.value}
                onClick={() => field.onChange(!field.value)}
              />
            </FormControl>
            <FormDescription className="text-sm" onClick={() => field.onChange(!field.value)}>
              {t('preorder.agreeMarketing')}
            </FormDescription>
          </FormItem>
        )}
      />
      <p className="text-xs text-gray-500 mt-4">{t('preorder.term')}</p>
    </div>
  );
};
