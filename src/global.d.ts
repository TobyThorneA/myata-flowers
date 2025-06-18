// src/global.d.ts
declare const ym: (
  counterId: number,
  method: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => void;

interface Window {
  ym?: typeof ym;
}