import { NextRequest } from 'next/server';

import { getNewThemeByHex, getRandomHex } from '@/lib/theme';
import { Theme } from '@/models/theme';

let cachedTheme: Theme | null = null;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const hexCode = searchParams.get('color');

    let theme = cachedTheme;

    let newTheme: Theme | null = null;

    if (hexCode) {
      newTheme = await getNewThemeByHex(hexCode);
    } else {
      if (!theme) {
        newTheme = await getNewThemeByHex(getRandomHex());
      }
    }

    if (newTheme) {
      theme = newTheme;
      cachedTheme = newTheme;
    }

    return Response.json({
      data: { theme },
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
