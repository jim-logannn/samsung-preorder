import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)

export function getDate(string: string) {
	return dayjs(string, 'YYYYMMDD')
}
export function isSameOrAfterSecondDate(string1: string, string2: string) {
	return getDate(string1).isSameOrAfter(getDate(string2))
}
export function isAfterSecondDate(string1: string, string2: string) {
	return getDate(string1).isAfter(getDate(string2))
}

export {
	dayjs
}