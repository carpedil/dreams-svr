import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	const { moduleId } = params;

	const functions = await prisma.function.findMany({
		where: {
			ModuleName: {
				equals: `/${moduleId}`
			}
		}
	});

	functions.forEach((func) => {
		func.Uri = `${func.Uri}/api`;
	});

	console.log(functions);
	return {
		functions
	};
};
