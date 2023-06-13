import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(RequestEvent: any) {
	const { request } = RequestEvent;
	const reqData = await request.json();
	console.log('post data received:\n', reqData);

	const max_in_db = await prisma.$queryRaw<
		Array<{ no: number }>
	>`SELECT max(No) no from Scenario where FuncName = ${reqData.FuncName};`;

	// convert query result into CURR_MAX object
	const curr_max = max_in_db.reduce((curr_max, m) => {
		curr_max['number'] = Number(m.no);
		return curr_max;
	}, {} as { [key: string]: number });

	// +1 as new scenario number for new scenario record
	curr_max.number += 1;

	const scenario = await prisma.scenario.create({
		data: {
			Name: reqData.Name,
			FuncName: reqData.FuncName,
			OldRawLogs: reqData.OldRawLogs,
			NewRawLogs: reqData.NewRawLogs,
			Comment: reqData.Comment,
			FuncId: Number(reqData.FuncId),
			No: curr_max.number
		}
	});
	const jsonStr = JSON.stringify(scenario, null, 4);
	// console.log('id : ', scenario.Id);

	return json({
		Id: scenario.Id,
		message: `created new scenario \n ${jsonStr}`
	});
}
