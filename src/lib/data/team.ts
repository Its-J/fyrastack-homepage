export type TeamMember = {
	name: string;
	nickname: string | null;
	role: string;
	avatar: string;
};

export const team: (TeamMember | null)[] = [
	{ name: 'Katherine Cole',  nickname: 'Jade',    role: 'Director / Infrastructure', avatar: '/assets/people/kat.webp'     },
	{ name: 'Lleyton Gray',    nickname: 'Lea',   role: 'Director / Operations',    avatar: '/assets/people/lleyton.webp' },
	{ name: 'Owen Zimmerman',            nickname: null,    role: 'Director / Engineering',          avatar: '/assets/people/owen.webp'    },
  { name: 'Matilde Park', nickname: null, role: 'Software Engineer', avatar: '/assets/people/matilde.webp' },

];
