export type Partner = {
	name: string;
	nickname: string | null;
	role: string;
};

export const partners: (Partner | null)[] = [
	{ name: 'Yuning Liang', nickname: null, role: 'CEO · DeepComputing' },
];
