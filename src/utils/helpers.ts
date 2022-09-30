export const intToRGB = (i: number): string => {
  const c = (i & 0x00ffffff).toString(16).toLowerCase();
  return `#${c.padStart(6, "0")}`;
};

export const RGBToint = (s: string): number => {
  return parseInt(s.slice(1), 16);
};

export const min = (...args: number[]) => {
  return args.reduce((m, x) => m < x ? m : x, args[0]);
};

export const max = (...args: number[]) => {
  return args.reduce((m, x) => m > x ? m : x, args[0]);
};

export const iOS = () => {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
};
