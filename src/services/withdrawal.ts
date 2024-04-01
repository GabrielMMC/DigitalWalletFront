'use server';

import { Response } from '@/domain/Request';
import { POST } from '@/requests/post';

export const createWithdrawal = async <T>(form: any): Promise<Response<T>> => {
  return await POST('withdrawal/create', JSON.stringify(form));
}




