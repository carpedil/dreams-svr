import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// export async function GET() {
// 	// const data = await prisma.navFunc.findMany({
// 	// 	select: {
// 	// 		name: true
// 	// 	},
// 	// 	orderBy: {
// 	// 		id: 'asc'
// 	// 	}
// 	// });

// 	// return json(data);
// }

// export async function POST(RequestEvent: any) {
// 	const { request } = RequestEvent;
// 	const reqData = await request.json();
// 	console.log('data received:', reqData);

export async function POST(RequestEvent: any) {
	const { request } = RequestEvent;
	const reqData = await request.json();
	console.log('post data received:\n', reqData);

	const scenario = await prisma.Scenario.create({
		data: {
			Name: reqData.Name,
			FuncName: reqData.FuncName,
			OldRawLogs: reqData.OldRawLogs,
			NewRawLogs: reqData.NewRawLogs,
			Comment: reqData.Comment,
			FuncId: Number(reqData.FuncId)
		}
	});
	const jsonStr = JSON.stringify(scenario, null, 4);
	// console.log('id : ', scenario.Id);

	return json({
		Id: scenario.Id,
		message: `created new scenario \n ${jsonStr}`
	});
}
