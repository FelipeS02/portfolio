import { getNewThemeByHex, getRandomHex } from '@/lib/theme';
import { Theme } from '@/models/theme';

let cachedTheme: Theme | null = null;

export async function GET() {
  try {
    let theme = null;

    if (!theme) {
      const hexCode = getRandomHex();

      const newTheme = await getNewThemeByHex(hexCode);

      theme = newTheme;
      cachedTheme = newTheme;
    } else {
      console.log("cache brada")
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
