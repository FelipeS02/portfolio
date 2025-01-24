import { NextRequest } from 'next/server';

import { getNewThemeByHex, getRandomHex } from '@/lib/theme';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const hexCode = searchParams.get('color');

    const newTheme = await getNewThemeByHex(hexCode ?? getRandomHex());

    return Response.json({
      data: { theme: newTheme },
      status: 200,
      message: 'Image founded',
    });
  } catch (e) {
    const error = e as Error;
    return Response.json({
      data: null,
      status: 500,
      message: error.message,
    });
  }
}
