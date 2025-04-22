// src/utils/dateUtils.ts
export const toIsoString = (date: Date): string =>
    date.toISOString().split("T")[0];
