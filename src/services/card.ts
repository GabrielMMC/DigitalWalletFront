'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';
import { POST } from '@/requests/post';

export const getCards = async <T>(): Promise<Response<T>> => {
  return await GET('card/list', 'cards', { tags: ['cards'] });
}

export const createCard = async <T>(form: any): Promise<Response<T>> => {
  return await POST('card/create', JSON.stringify(form), 'cards');
}




