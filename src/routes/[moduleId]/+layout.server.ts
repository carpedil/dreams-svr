import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	// console.log(params);

	const { moduleId } = params;

	const functions = await prisma.functions.findMany({
		where: {
			ModuleUri: {
				equals: `/${moduleId}`
			}
		}
	});

	if (functions.length === 0) {
		throw error(404, {
			message: 'Not found'
		});
	}

	// console.log(functions);
	return {
		moduleId,
		functions
	};
};
