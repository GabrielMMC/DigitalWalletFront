'use server'

import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { revalidateTag } from "next/cache";

const defaultCookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24,
};

export const setCookies = (name: string, value: string, options?: ResponseCookie) => {
  const cookieOptions = options ? options : defaultCookieOptions
  cookies().set(name, value, cookieOptions);
}

export const getCookie = async (name: string) => {
  return cookies().get(name)?.value;
}

export const revalidateTags = (tags: string | string[]): void => {
  if (Array.isArray(tags)) {
    for (const tag of tags) {
      revalidateTag(tag);
    }
  } else {
    revalidateTag(tags);
  }
};