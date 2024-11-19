import { Photo, PhotoSearchParams, PhotoSearchResult } from '@/models/photos';
import axios from 'axios';
import { env } from 'process';

export const pexelsApiUrl = 'https://api.pexels.com/v1';

export const pexelsClient = axios.create({
  baseURL: pexelsApiUrl,
  headers: {
    Authorization: env.PEXEL_API_KEY,
  },
});

export const pexelsApiEndpoints = {
  search: 'search',
};

export async function getPhotosFromPexels(
  params: PhotoSearchParams
): Promise<Photo[]> {
  if (!params) throw new Error('Params must be specified');

  const queryParams = new URLSearchParams(params).toString();

  const endpointWithParams = `${pexelsApiEndpoints.search}?${queryParams}`;

  const { data: res } = await pexelsClient.get<PhotoSearchResult>(
    endpointWithParams
  );

  return res.photos;
}
