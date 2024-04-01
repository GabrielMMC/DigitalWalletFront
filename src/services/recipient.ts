'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';
import { POST } from '@/requests/post';

export const getBalance = async <T>(): Promise<Response<T>> => {
  return await GET('recipient/balance', ['balance'], { revalidate: 0, tags: ['balance'] });
}





