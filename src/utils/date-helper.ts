import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

import {
	GetDateFormatInterface,
	GetDateTimeInterface,
} from '@/interfaces/date.interface';

/**
 * Get Date Format
 *
 * @param date
 * @param formatDate - Default 'yyyy-MM-dd'
 * @returns
 */
export const getDateFormat = ({
	date,
	formatDate = 'yyyy-MM-dd',
}: GetDateFormatInterface) => {
	const newDate = date ? new Date(date) : new Date();

	return format(newDate, formatDate);
};

/**
 * Get Date Time with Timezone
 *
 * @param date
 * @param timezone - Default 'Asia/Manila'
 * @returns
 */
export const getDateTime = ({
	date,
	timezone = 'Asia/Manila',
}: GetDateTimeInterface) => {
	return zonedTimeToUtc(date, timezone);
};
