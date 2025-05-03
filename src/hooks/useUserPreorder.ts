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

  const userPreorder = async (data: UserPreorderVariables) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      toast.error(t('preorder.error.unauthorized'), {
        position: 'top-center',
      });

      return { data: null, error: userError };
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
          : response.error.message
      );
      return { data: null, error: response.error };
    }

    return response;
  };

  return useMutation({
    mutationFn: userPreorder,
  });
};
