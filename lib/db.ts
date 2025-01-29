import oracledb, { Pool, PoolAttributes } from "oracledb";

const dbConfig: PoolAttributes = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECTSTRING,
};

let pool: Pool | null = null;

export async function getDb() {
  if (pool == null) pool = await oracledb.createPool(dbConfig);
  return pool.getConnection();
}

export async function executeSql<T>(sql: string, binds: string[], autoCommit?: boolean) {
  const conn = await getDb();
  const result = await conn.execute<T>(sql, binds, {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    autoCommit: autoCommit,
  });
  await conn.close();
  return result;
}

async function closePoolAndExit() {
  console.log("\nTerminating");
  try {
    await oracledb.getPool().close(10);
    console.log("Pool closed");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

process.once("SIGTERM", closePoolAndExit).once("SIGINT", closePoolAndExit);
