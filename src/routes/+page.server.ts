import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load = async () => {

	const toObject = (data: any) => {
		return JSON.parse(
			JSON.stringify(data, (_key, value) =>
				typeof value === 'bigint'
					? Number(value) // 将 bigInt 转换为 number 类型
					: value
			)
		);
	};
    
    let query_api_name_count = await prisma.$queryRaw<
        Array<{ total: number; distinctedTotal: number }>
    >`SELECT COUNT(ApiName) total,COUNT(DISTINCT ApiName) distinctedTotal from ApiMessage;`;

	let query_api_name_count_by_hdr = await prisma.$queryRaw<
		Array<{ HDR: string; distinctedApiCount: number; totalApiCount: number }>
	>`SELECT distinct HDR , count(distinct ApiName) as distinctedApiCount,COUNT(ApiName) as totalApiCount FROM ApiMessage group by HDR;`;

	let query_api_name_count_by_funcName = await prisma.$queryRaw<
		Array<{ HDR: string; distinctedApiCount: number; totalApiCount: number }>
	>`SELECT distinct FuncName , count(distinct ApiName) as distinctedApiCount,COUNT(ApiName) as totalApiCount FROM ApiMessage group by FuncName;`;

    query_api_name_count= toObject(query_api_name_count);
	query_api_name_count_by_hdr = toObject(query_api_name_count_by_hdr);
	query_api_name_count_by_funcName = toObject(query_api_name_count_by_funcName);

	return {
		data: {
            query_api_name_count,
			query_api_name_count_by_hdr,
			query_api_name_count_by_funcName
		}
	};
};
