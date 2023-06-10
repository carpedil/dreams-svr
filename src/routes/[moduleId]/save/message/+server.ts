import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(RequestEvent: any) {
	const { request } = RequestEvent;
	const reqData = await request.json();
	console.log('post data received:\n', reqData);

	const message = await prisma.ApiMessage.create({
		data: {
			Seq: reqData.Seq,
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

	const jsonStr = JSON.stringify(message, null, 4);

	return json({
		message: `created new message ${jsonStr} !`
	});
}
