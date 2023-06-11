import { PrismaClient } from '@prisma/client';
import { error } from '@sveltejs/kit';
const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	console.log(params);
	const { moduleId, funcId } = params;
	const uri = `/${moduleId}/${funcId}`;

	const func = await prisma.functions.findFirst({
		where: {
			Uri: {
				equals: uri
			}
		}
	});
	if (func === null) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return {};
};
