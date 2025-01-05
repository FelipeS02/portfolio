import { type ClassValue,clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export async function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function removeByIndex<T>(arr: readonly T[], index: number): T[] {
  if (!arr) throw Error('Array is undefined');
  if (index > arr.length) throw Error('Index out of bounds');

  const newArr = [...arr];

  newArr.splice(index, 1);

  return newArr;
}
