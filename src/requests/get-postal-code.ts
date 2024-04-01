'use server';

import apiError from '@/utils/api-error';
import { Response } from '@/domain/Request';

export const GET_POSTAL_CODE = async <T>(value: string): Promise<Response<T>> => {
  try {
    const response = await fetch(`http://viacep.com.br/ws/${value}/json/`, {
      method: 'GET',
    });
    if (!response.ok) throw new Error("fetching error: " + response.status)
    const data = await response.json();

    return { data: data, ok: true, error: '', pagination: null };
  } catch (error: unknown) {
    return apiError(error);
  }
}