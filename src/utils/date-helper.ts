import { format } from 'date-fns';

interface GetDateFormatInterface {
	date: Date;
	formatDate?: string;
}
export const getDateFormat = ({
	date = new Date(),
	formatDate = 'yyyy-MM-dd',
}: GetDateFormatInterface) => {
	if (!date) {
		return '';
	}

	return format(date, formatDate);
};
