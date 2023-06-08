import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async () => {
	let title = 'OSF Server Api A/B Test Function';
	const modules = await prisma.module.findMany();

	return {
		title,
		modules
	};
};
