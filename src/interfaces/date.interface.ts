export interface GetDateFormatInterface {
  date?: Date | string | null;
  formatDate?: string;
}

export interface GetDateTimeInterface {
  date: Date | string;
  timezone?: string;
}
