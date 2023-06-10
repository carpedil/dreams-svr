import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async (serverLoadEvent: { params: any }) => {
	const { params } = serverLoadEvent;
	const { funcId, moduleId } = params;
	console.log(moduleId, funcId);

	const func = await prisma.Functions.findFirst({
		where: {
			Uri: {
				equals: `/${moduleId}/${funcId}`
			}
		},
		include: {
			Scenarios: {
				include: {
					messages: {
						orderBy: {
							Seq: 'asc'
						}
					}
				},
				orderBy: {
					Id: 'asc'
				}
			}
		}
	});

	console.log(func);

	return {
		func
	};
};
