import { MD5 } from "./MD5";

/**
 * Function that, given an id, return an hexidecimal color
 * made from a MD5 hash of that id
 * @param id
 */
export function generateColorFromId(id: string) {
  let idHashed = MD5(id);
  let idHashedColor = parseInt(idHashed, 16) % 16777215; // #ffffff upperlimit

  return `#${idHashedColor.toString(16)}`;
}
