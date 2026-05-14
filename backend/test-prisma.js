const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function test() {
  const results = {};
  
  try {
    // 1. Kilos Collected Aggregate
    try {
      const agg1 = await prisma.report.aggregate({
        _sum: { kilosCollected: true }
      });
      results.kilosCollected = { status: 'PASS', data: agg1._sum };
    } catch (e) { results.kilosCollected = { status: 'FAIL', error: e.message }; }

    // 2. Location enabled count (Assuming 'Location' model from schema)
    try {
      const count2 = await prisma.location.count({
        where: { enabled: true }
      });
      results.locationEnabled = { status: 'PASS', data: count2 };
    } catch (e) { results.locationEnabled = { status: 'FAIL', error: e.message }; }

    // 3. Status COMPLETED/RESOLVED/COLLECTED aggregate
    try {
      const agg3 = await prisma.report.aggregate({
        _count: { _all: true },
        where: { status: { in: ['COMPLETED', 'RESOLVED', 'COLLECTED'] } }
      });
      results.statusAggregate = { status: 'PASS', data: agg3._count };
    } catch (e) { results.statusAggregate = { status: 'FAIL', error: e.message }; }

    // 4. WASTE counts excluding wasteType key general
    try {
      const count4 = await prisma.report.count({
        where: {
          type: 'WASTE',
          wasteType: {
            key: { not: { equals: 'general', mode: 'insensitive' } }
          }
        }
      });
      results.wasteExcludingGeneral = { status: 'PASS', data: count4 };
    } catch (e) { results.wasteExcludingGeneral = { status: 'FAIL', error: e.message }; }

    // 5. GroupBy userId
    try {
      const group5 = await prisma.report.groupBy({
        by: ['userId'],
        _count: { _all: true }
      });
      results.groupByUserId = { status: 'PASS', count: group5.length };
    } catch (e) { results.groupByUserId = { status: 'FAIL', error: e.message }; }

    // 6. Trend findMany with wasteType key
    try {
      const trend6 = await prisma.report.findMany({
        take: 5,
        include: { wasteType: { select: { key: true } } }
      });
      results.trendFindMany = { status: 'PASS', data: trend6.length };
    } catch (e) { results.trendFindMany = { status: 'FAIL', error: e.message }; }
    
     // 7. GroupBy wasteTypeId
    try {
      const group7 = await prisma.report.groupBy({
        by: ['wasteTypeId'],
        _count: { _all: true }
      });
      results.groupByWasteType = { status: 'PASS', count: group7.length };
    } catch (e) { results.groupByWasteType = { status: 'FAIL', error: e.message }; }

    console.log(JSON.stringify(results, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.\$disconnect\();
  }
}

test();
