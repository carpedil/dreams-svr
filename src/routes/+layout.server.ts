import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async () => {
	let title = 'DREAMS Server Api Test ';
	const modules = await prisma.module.findMany();

	return {
		title,
		modules
	};
};
