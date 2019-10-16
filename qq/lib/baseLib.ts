export function arraysDiff(first: any[], second: any[]): any[] {
  return first.filter((e: string) => !second.includes(e));
}
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
