export const camelToTitle = value => {
	const result = value.replace(/([A-Z])/g, ' $1');
	return result.charAt(0).toUpperCase() + result.slice(1);
};

export const stringToCamel = value => value?.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());

export const snakeToTitle = s => s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());

export const stringToUpperSnake = value => (value.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/)
	.map(word => word.toUpperCase())
	.join('_'));

export const isBlacklistedChoice = (choice) => {
	switch (choice) {
	case '02-Tunnel':
	case '02-Tunnel Return Variant':
	case '03-Three Paths':
	case '13a-Wrong room':
	case '13aa-Wrong room':
	case '13b-Correct room':
	case '13bb-Correct room':
		return true;
	default: return false;
	}
}; 
