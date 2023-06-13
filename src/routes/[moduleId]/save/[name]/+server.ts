import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(RequestEvent: any) {
    const {params} = RequestEvent;
    const {name} = params;
	console.log(`checking if Name:${name} is already existed in Db!!`)
	const scenario = await prisma.scenario.findFirst({
		where :{
			Name:{
				equals: name
			}
		}
	});
	console.log('is existed ? ', scenario ? true : false)
	return json(scenario ? true : false);
}