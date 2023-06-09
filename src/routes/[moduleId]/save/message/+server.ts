import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(RequestEvent: any) {
	const { request } = RequestEvent;
	const reqData = await request.json();
	console.log('post data received:\n', reqData);

	const message = await prisma.apiMessage.create({
		data: {
			FuncName: reqData.FuncName,
			ApiName: reqData.ApiName,
			Platform: reqData.Platform,
			HDR: reqData.HDR,
			Sendto: reqData.Sendto,
			Received: reqData.Received,
			SendParams: reqData.SendParams.join(';'),
			ReceivedParams: reqData.ReceivedParams.join(';'),
			Comment: reqData.Comment,
			ScenarioId: reqData.ScenarioId
		}
	});
	// const jsonStr = JSON.stringify(scenario,null,4)
	console.log('created message : ', message.Id);

	return json({
		message: `created new message ${message.Id} !`
	});
}
