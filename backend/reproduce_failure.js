const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function runTest() {
  const tests = [
    {
      name: "report.aggregate sum/count",
      fn: () => prisma.report.aggregate({
        _sum: { weight: true },
        _count: { _all: true }
      })
    },
    {
      name: "location.count enabled",
      fn: () => prisma.location.count({
        where: { status: "ENABLED" }
      })
    },
    {
      name: "report.aggregate with completed statuses",
      fn: () => prisma.report.aggregate({
        where: {
          status: { in: ["COMPLETED", "PICKED_UP", "DROPPED_OFF"] }
        },
        _sum: { weight: true }
      })
    },
    {
      name: "report.count with type=WASTE and relation filter NOT wasteType key general",
      fn: () => prisma.report.count({
        where: {
          type: "WASTE",
          wasteType: {
            isNot: { key: { equals: "general", mode: "insensitive" } }
          }
        }
      })
    },
    {
      name: "report.groupBy by userId with createdAt gte 30 days",
      fn: () => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return prisma.report.groupBy({
          by: ["userId"],
          where: { createdAt: { gte: thirtyDaysAgo } },
          _count: { _all: true }
        });
      }
    },
    {
      name: "report.findMany select createdAt/updatedAt",
      fn: () => prisma.report.findMany({
        take: 1,
        select: { createdAt: true, updatedAt: true }
      })
    },
    {
      name: "report.findMany with wasteType select key and OR date filters",
      fn: () => {
        const now = new Date();
        return prisma.report.findMany({
          where: {
            OR: [
              { createdAt: { gte: now } },
              { updatedAt: { gte: now } }
            ]
          },
          select: { wasteType: { select: { key: true } } }
        });
      }
    },
    {
      name: "report.groupBy by wasteTypeId",
      fn: () => prisma.report.groupBy({
        by: ["wasteTypeId"],
        _sum: { weight: true }
      })
    }
  ];

  for (const test of tests) {
    console.log(`Running: ${test.name}`);
    try {
      await test.fn();
      console.log(`SUCCESS: ${test.name}`);
    } catch (error) {
      console.error(`FAILURE: ${test.name}`);
      console.error(error.stack);
      // We continue to see other potential failures
    }
  }
  await prisma.$disconnect();
}

runTest();
