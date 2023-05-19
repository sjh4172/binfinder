export default function useDate(dateString) {
	if (typeof dateString === 'string') {
		const date = new Date(dateString);
		const today = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		const formattedDate =
			date.toDateString() === today.toDateString()
				? `${hours}:${minutes}`
				: `${year}.${month}.${day}`; // 오늘인 경우 시간만, 그렇지 않은 경우 날짜만
		const formattedDateTime = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
		return [formattedDate, formattedDateTime];
	}
	return 'Invalid dateString';
}
