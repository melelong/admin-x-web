import { EMAIL_REGEX } from '@/utils/regex';

export const isValidEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};
