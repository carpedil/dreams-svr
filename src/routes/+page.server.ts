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

	let inner = await prisma.$queryRaw<
		Array<{ name: string; value: number }>
	>`SELECT distinct HDR as name , count(distinct ApiName) as value FROM ApiMessage group by HDR;`;

	let outter = await prisma.$queryRaw<
		Array<{ name: string; value: number; total: number }>
	>`SELECT distinct FuncName as name , count(distinct ApiName) as value,count(ApiName) total  FROM ApiMessage group by FuncName;`;

	total = convertBigInt(total);
	inner = convertBigInt(inner);
	outter = convertBigInt(outter);
	// console.log(total,'\n');
	// console.log(inner,'\n');
	// console.log(outter,'\n');

	const mapped_total = total.reduce((obj, m) => {
		obj['all'] = m.total;
		return obj;
	}, {} as { [key: string]: number });

	console.log(mapped_total);

	const mapped_inner = inner.reduce((obj, m) => {
		obj[m.name] = m.value;
		return obj;
	}, {} as { [key: string]: number });

	console.log(mapped_inner);

	const mapped_outter = outter.reduce((obj, m) => {
		obj[m.name] = m.total;
		return obj;
	}, {} as { [key: string]: number });

	console.log(mapped_outter);

	return {
		data: {
			builderJson: {
				all: mapped_total.all,
				charts: mapped_inner,
				componnets: mapped_outter
			},
			downloadJson: mapped_inner,
			themeJson: mapped_outter,
			total,
			inner: mapped_inner,
			outter: mapped_outter
		}
	};
};
