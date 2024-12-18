import { add } from "@paper/back";

export function subtract(a: number, b: number): number {
  return add(a, b * -1);
}
