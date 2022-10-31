/**
 * Parse Excel's serial date format into a JavaScript Date object.
 * @param {number} serialDate - Days since epoch
 */
export const parseSerialDate = (serialDate: number) =>
  new Date(Date.UTC(0, 0, serialDate - 1));
