export const processLogs = (logs: string, regex: RegExp) => {
	const result = [];
	const lines = logs.split('\n');
	// console.log('>>\n',lines)
	for (let line of lines) {
		if (regex.test(line)) {
			result.push(line);
		}
	}
	// console.log('>>\n',result)
	const line_groups = [];
	for (let i = 0; i < result.length; i++) {
		if (result[i].includes('[SendMessage]') || result[i].includes('[Send Data]')) {
			let sendMessage = result[i];
			let receiveMsg = '';
			for (let j = i + 1; j < result.length; j++) {
				if (result[j].includes('[ReceiveMsg]') || result[j].includes('[Received Data]')) {
					receiveMsg = result[j];
					if (result.length > j + 1 && result[j + 1].includes('[Received Data]')) {
						receiveMsg += result[j + 1].slice(31);
					}
					break;
				}
				break;
			}
			line_groups.push(sendMessage + '+' + receiveMsg);
		}
	}
	// console.log(line_groups);
	return line_groups;
};

export const formateStr = (inputStr: string, pattr: string) => {
	const arr = inputStr.split(pattr);
	const result = arr.map((line) => {
		const time = line.slice(0, 26);
		const msg = line.slice(26);
		return `${pattr} ${time}${msg}`;
	});
	return result.join('\n');
};

export const getDatePattern = (new_str: string) => {
	const date = new Date();
	let datePattern = '';
	if (new_str.includes(`[${date.getFullYear()}`)) {
		datePattern = `${new_str.slice(0, 11)}`;
	} else {
		datePattern = `${new_str.slice(0, 5)}`;
	}
	return datePattern;
};

export const optimizeLineBreakerAndWhiteSpace = (str: string) => {
	let strr = str.trim();
	// 先进行换行符替换,全部替换为单个空格
	let new_str = strr.replace(/\n\s{15}/g, '');
	// 替换剩余换行符
	new_str = new_str.replace(/\n/g, ' ');
	return new_str;
};

export const formate = (str: string) => {
	if (str === '') {
		return '';
	}
	str = str.trim();
	// 先进行换行符替换,全部替换为单个空格
	let new_str = str.replace(/\n\s*/g, ' +++++ ');
	// 替换剩余换行符
	// new_str = new_str.replace(/\n/g, ' ');
	// console.log(new_str);
	return new_str;
};

export const extract = (inputStr: string) => {
	if (inputStr === '') {
		return [];
	}

	const params = [];
	const interface_name = ExtractInterfaceFrom(inputStr);
	params.push(interface_name);

	if (inputStr.includes('JOBDATA=')) {
		// console.log('have job data');
		let [jobdata, left_string] = extractJobDataFrom(inputStr);
		// console.log(left_string);

		parseParamsByRegex(left_string, params);
		// push jobdata to the bottom of params list
		params.push(`JOBDATA=${jobdata}`);
	} else {
		parseParamsByRegex(inputStr, params);
	}

	// console.log(params);
	return params;
};

export const parseParamsByRegex = (inputStr: string, params: string[]) => {
	// 提取等号右边存在双引号的内容，你可以使用这个正则表达式：(\w+)=((?:"[^"]*"|[^ ])+)。
	// 这个正则表达式会匹配一个或多个字母数字字符（\w+），后面跟着一个等号（=），
	// 然后是一个或多个非空格字符（[^ ]+）或者一个被双引号包围的字符串（"[^"]*"）
	// const regex = /(\w+)=((?:"[^"]*"|[^ ])+)/g;

	// let match;
	// while ((match = regex.exec(inputStr)) !== null) {
	// 	console.log(match)
	// 	console.log(`${match[1]}=${match[2]}`);
	// 	params.push(`${match[1]}=${match[2]}`);
	// }

	// 匹配一个或多个非空格字符，后面紧跟一个等号，再后面是一个由一对双引号包裹的字符串（其中可以包含任意字符或符号）或零个或多个非空格字符。这些字符必须被空格包围
	// const regex = /(?<=\s)[^=\s]+=(?:"(?:[^"\\]|\\.)*"|[^=\s]*)(?=\s)/g;
	const regex = /[^=\s]+=(?:"(?:[^"\\]|\\.)*"|[^=\s]*)(?=\s)/g;
	// const regex = /(\w+)=((?:"[^"]*"|\w*/g;
	const matches = inputStr.match(regex);
	matches?.forEach((item) => {
		params.push(item);
	});
};

export const ExtractInterfaceFrom = (inputStr: string) => {
	if (inputStr === '') {
		return '';
	}
	let interface_name = '';

	let pattern =
		/\[((Send Data)|(SendMessage)|(Received Data)|(ReceiveMsg))\](:?\s?)(\d+)?(\w+)(\s)/;
	let match_results = pattern.exec(inputStr);
	// console.log('pattern result: ', match_results);
	if (match_results !== null) {
		interface_name = match_results[8];
		// console.log('pattern matched: ', interface_name); // GETLOTINFO
		return interface_name;
	}
	return '';
};

export const extractJobDataFrom = (inputStr: string): [string, string] => {
	const no_data: [string, string] = ['', ''];

	try {
		const JOBDATA = 'JOBDATA';
		if (inputStr === '') {
			return no_data;
		}
		const indexOfJobData = inputStr.indexOf(JOBDATA);
		const left_string = inputStr.substring(0, indexOfJobData);
		let pattern = /".*"/g;

		const match_results = pattern.exec(inputStr);
		const jobdata = match_results ? match_results[0] : '';
		if (jobdata !== null) {
			return [jobdata, left_string];
		}
		return no_data;
		// console.log('matched result: ',match_results[0]);
	} catch (error) {
		alert('extract job data occurs error');
		return no_data;
	}
};
