export type TeamMember = {
	name: string;
	nickname: string | null;
	role: string;
	avatar: string;
};

export const team: (TeamMember | null)[] = [
	{ name: 'Katherine Cole',  nickname: null,    role: 'Founder / Infrastructure', avatar: '/assets/people/kat.webp'     },
	{ name: 'Lleyton Gray',    nickname: 'Lea',   role: 'Director / Operations',    avatar: '/assets/people/lleyton.webp' },
	{ name: 'Matilde Park',    nickname: null,    role: 'Software Engineer',         avatar: '/assets/people/matilde.webp' },
	{ name: 'Pornpipat Popum', nickname: 'Cappy', role: 'Systems Engineer',          avatar: '/assets/people/cappy.webp'   },
	{ name: 'Owen',            nickname: null,    role: 'Systems Engineer',          avatar: '/assets/people/owen.webp'    },
	{ name: 'Jade',            nickname: null,    role: 'Software Engineer',         avatar: '/assets/people/jade.webp'    },
];
