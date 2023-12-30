import { AxiosError } from 'axios';
import { NewUser, SubmitData } from 'types';

export const getValuesFromFromData = <T>(form: HTMLFormElement): T => {
  const formData = new FormData(form);
  const formJson = Object.fromEntries(formData.entries()) as T;

  return formJson;
};

export const errorParser = (error: unknown): string | undefined => {
  if (error instanceof AxiosError) {
    return error.response?.status === 404
      ? error.message
      : error.response?.data;
  }

  if (error instanceof Error) { return error.message; }
};

export const isNewUserDataGuard = (data: SubmitData): data is NewUser => {
  return (data as NewUser).username !== undefined;
};
