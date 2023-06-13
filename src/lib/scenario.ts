import { extract, formateStr, getDatePattern, optimizeLineBreakerAndWhiteSpace } from './helper';
import type { ApiMessage as Api } from '@prisma/client';

declare type invalidated = null | undefined | '';

export class ScenarioData {
	Name!: string;
	FuncName!: string;
	OldRawLogs!: string;
	NewRawLogs!: string;
	Comment!: string;
	FuncId!: number;
	OldApiMessages: ApiMessage[] = [];
	NewApiMessages: ApiMessage[] = [];

	constructor() {}
	set_old_api_message(messages: ApiMessage[]) {
		this.OldApiMessages = messages;
	}
	set_new_api_message(messages: ApiMessage[]) {
		this.NewApiMessages = messages;
	}

	extractMessages(logs: string): ApiMessage[] {
		const newStr = optimizeLineBreakerAndWhiteSpace(logs);
		const regex = /(SendMessage|ReceiveMsg|Send Data|Received Data)/;
		const pattern = getDatePattern(newStr);
		let formated = formateStr(newStr, pattern);

		const result = [];
		const lines = formated.split('\n');
		// console.log('>>\n',lines)
		for (let line of lines) {
			if (regex.test(line)) {
				result.push(line);
			}
		}
		// console.log('>>\n',result)
		const line_groups: ApiMessage[] = [];
		let seq = 1;
		for (let i = 0; i < result.length; i++) {
			let apiMessage = new ApiMessage();
			apiMessage.FuncName = this.FuncName;
			apiMessage.set_edition(result[i]);
			if (result[i].includes('[SendMessage]') || result[i].includes('[Send Data]')) {
				let sendMessage = result[i];
				apiMessage.Sendto = sendMessage;
				let receiveMsg = '';
				for (let j = i + 1; j < result.length; j++) {
					if (result[j].includes('[ReceiveMsg]') || result[j].includes('[Received Data]')) {
						receiveMsg = result[j];
						apiMessage.Received = receiveMsg;
						if (result.length > j + 1 && result[j + 1].includes('[Received Data]')) {
							receiveMsg += result[j + 1].slice(31);
							apiMessage.Received = receiveMsg;
						}
						break;
					}
					break;
				}
				apiMessage.extractParams(apiMessage.Sendto, apiMessage.Received);
				apiMessage.set_api_name(apiMessage.SendParams[0]);
				apiMessage.set_hdr(apiMessage.SendParams[1]);
				apiMessage.Seq = seq++;
				line_groups.push(apiMessage);
			}
		}
		// console.log(line_groups);
		return line_groups;
	}

	funcNameAndIdValidation(): this is invalidated {
		if (this.FuncId === null || this.FuncId === undefined || this.FuncId === 0) {
			return true;
		} else if (this.FuncName === null || this.FuncName === undefined || this.FuncName === '') {
			return true;
		}
		return false;
	}
	scenarioNameAndIdValidation(): this is invalidated {
		if (this.Name === null || this.Name === undefined || this.Name === '') {
			return true;
		}
		return false;
	}
}

export class ApiMessage {
	Seq!: number;
	FuncName!: string;
	ApiName!: string;
	Platform!: string;
	HDR!: string;
	Sendto!: string;
	Received!: string;
	SendParams!: string[];
	ReceivedParams!: string[];
	Comment!: string;
	ScenarioId!: number;
	constructor() {}

	set_api_name(api_name: string) {
		this.ApiName = api_name;
	}

	set_hdr(hdr: string) {
		let message = hdr.split(',')[0];
		let regex = /HDR=([^ ]*)/;
		let match = message.match(regex);
		// console.log(match);
		if (match) {
			let value = match[1];
			this.HDR = value;
		}
	}

	set_edition(data: string) {
		const datetime = new Date();
		this.Platform = data.includes(`${datetime.getFullYear().toString()}-`) ? 'win10' : 'Xp';
	}

	static into(apiMessage: Api): ApiMessage {
		let that = new ApiMessage();
		that.Seq = apiMessage.Seq;
		that.FuncName = apiMessage.FuncName;
		that.ApiName = apiMessage.ApiName;
		that.Platform = apiMessage.Platform;
		that.HDR = apiMessage.HDR;
		that.Sendto = apiMessage.Sendto;
		that.Received = apiMessage.Received;
		that.SendParams = apiMessage.SendParams.split(';');
		that.ReceivedParams = apiMessage.ReceivedParams.split(';');
		that.Comment = apiMessage.Comment;
		that.ScenarioId = apiMessage.ScenarioId;

		return that;
	}

	extractParams(sendto: string, received: string) {
		console.log(sendto, received);
		this.SendParams = extract(sendto);
		this.ReceivedParams = received ? extract(received) : [];
	}
}
