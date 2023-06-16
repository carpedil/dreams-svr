import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async () => {
	const convertBigInt = (data: any) => {
		return JSON.parse(
			JSON.stringify(data, (_key, value) =>
				typeof value === 'bigint'
					? Number(value) // 将 bigInt 转换为 number 类型
					: value
			)
		);
	};

	const toObject = (arr: any) => {
		let data = convertBigInt(arr);
		return data.reduce((obj: { [x: string]: any }, m: { total: any }) => {
			obj['all'] = m.total;
			return obj;
		}, {} as { [key: string]: number });
	};

	let total = await prisma.$queryRaw<
		Array<{ total: number }>
	>`SELECT COUNT(ApiName) total from ApiMessage;`;

	let ApiMessageDistCntbyHdr = await prisma.$queryRaw<
		Array<{ name: string; value: number }>
	>`SELECT distinct HDR as name , count(distinct ApiName) as value FROM ApiMessage group by HDR;`;

	let ApiMessageCntbyHdr = await prisma.$queryRaw<
		Array<{ name: string; value: number }>
	>`SELECT distinct HDR as name , count(ApiName) as value FROM ApiMessage group by HDR;`;

	let ApiMessageDistCntbyFunctions = await prisma.$queryRaw<
		Array<{ name: string; value: number }>
	>`SELECT distinct FuncName as name , count(distinct ApiName) as value  FROM ApiMessage group by FuncName;`;

	let ApiMessageCntbyFunctions = await prisma.$queryRaw<
		Array<{ name: string; value: number }>
	>`SELECT distinct FuncName as name , count(ApiName) as value FROM ApiMessage group by FuncName;`;

	total = convertBigInt(total);
	ApiMessageDistCntbyHdr = convertBigInt(ApiMessageDistCntbyHdr);
	ApiMessageCntbyHdr = convertBigInt(ApiMessageCntbyHdr);
	ApiMessageDistCntbyFunctions = convertBigInt(ApiMessageDistCntbyFunctions);
	ApiMessageCntbyFunctions = convertBigInt(ApiMessageCntbyFunctions);

	const mapped_total = total.reduce((obj, m) => {
		obj['all'] = m.total;
		return obj;
	}, {} as { [key: string]: number });

	// console.log(mapped_total);

	const mapped_ApiMessageDistCntbyHdr = ApiMessageDistCntbyHdr.reduce((obj, m) => {
		obj[m.name] = m.value;
		return obj;
	}, {} as { [key: string]: number });

	// console.log(mapped_ApiMessageDistCntbyHdr);

	const mapped_ApiMessageCntbyHdr = ApiMessageCntbyHdr.reduce((obj, m) => {
		obj[m.name] = m.value;
		return obj;
	}, {} as { [key: string]: number });

	// console.log(mapped_ApiMessageCntbyHdr);

	const mapped_ApiMessageDistCntbyFunctions = ApiMessageDistCntbyFunctions.reduce((obj, m) => {
		obj[m.name] = m.value;
		return obj;
	}, {} as { [key: string]: number });

	// console.log(mapped_ApiMessageDistCntbyFunctions);

	const mapped_ApiMessageCntbyFunctions = ApiMessageCntbyFunctions.reduce((obj, m) => {
		obj[m.name] = m.value;
		return obj;
	}, {} as { [key: string]: number });

	// console.log(mapped_ApiMessageCntbyFunctions);

	return {
		data: {
			builderJson: {
				all: mapped_total.all,
				charts: mapped_ApiMessageCntbyHdr,
				componnets: mapped_ApiMessageCntbyFunctions
			},
			downloadJson: mapped_ApiMessageDistCntbyHdr,
			themeJson: mapped_ApiMessageDistCntbyFunctions
		}
	};
};
