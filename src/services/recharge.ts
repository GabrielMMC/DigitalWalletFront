'use server';

import { Response } from '@/domain/Request';
import { POST } from '@/requests/post';

export const createRecharge = async <T>(form: any): Promise<Response<T>> => {
  return await POST('recharge/create', JSON.stringify(form));
}




