const characterCount = (str: string) => {
	let count = 0;
	for (let i = 0, len = str.length; i < len; i++) {
			count += str.charCodeAt(i) < 256 ? 1 : 2;
	}
	return count;
};

const fontSizeAdjustByChars = (str: string): Record<string, string | false> => {
	const strLength = characterCount(str);
	if (strLength > 39) {
			return {
					lineHeight: '1.8rem',
					fontSize: '1.6rem',
			};
	}
	if (strLength > 31) {
			return {
					lineHeight: '2.2rem',
					fontSize: '1.8rem',
			};
	}
	return {
			fontSize: false,
			lineHeight: false,
	};
};

export default fontSizeAdjustByChars;
