import { format } from 'date-fns';

interface GetDateFormatInterface {
	date?: Date | string | null;
	formatDate?: string;
}
export const getDateFormat = ({
	date,
	formatDate = 'yyyy-MM-dd',
}: GetDateFormatInterface) => {
	const newDate = date ? new Date(date) : new Date();

	return format(newDate, formatDate);
};
