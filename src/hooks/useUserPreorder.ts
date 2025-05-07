import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { supabase } from 'utils/supabase';

interface UserPreorderVariables {
  email: string;
  phone: string;
  variation: string;
  is_agree_marketing: boolean;
}

export const useUserPreorder = () => {
  const { t } = useTranslation();

  const userPreorder = async (
    data: UserPreorderVariables
  ): Promise<{ status: number; error: AuthError | PostgrestError | null }> => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      toast.error(t('preorder.error.unauthorized'), {
        richColors: true,
        position: 'top-center',
      });

      return { status: 401, error: userError };
    }

    const response = await supabase.from('preorder').insert([
      {
        ...data,
        user_id: userData.user.id,
      },
    ]);

    if (response.error) {
      toast.error(
        response.error.code === '23505'
          ? t('preorder.error.duplicatePreorder', {
              position: 'top-center',
            })
          : response.error.message,
        {
          richColors: true,
        }
      );
    }

    return { status: response.status, error: response.error };
  };

  return useMutation({
    mutationFn: userPreorder,
  });
};
