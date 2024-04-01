'use server';

import { Response } from '@/domain/Request';
import { GET } from '@/requests/get';
import { POST } from '@/requests/post';

export const transfer = async <T>(form: any, userId: string): Promise<Response<T>> => {
  return await POST(`transfer/`, JSON.stringify({ ...form, user_id: userId }));
}

export const getTransfers = async <T>(search: string, page: number): Promise<Response<T>> => {
  return await GET(`transfer/historic?search=${search}&page=${page}`, ['historic'], { revalidate: 60, tags: ['historic'] });
}





