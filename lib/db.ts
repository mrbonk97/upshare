import sql from "mssql";

const sqlConfig = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  server: process.env.DB_SERVER!,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 60000 * 30,
  },
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool: sql.ConnectionPool | null = null;

export const getDbPool = async () => {
  if (pool && (pool.connected || pool.connecting)) {
    console.log("기존 DB 연결 풀 반환");
    return pool;
  }

  try {
    console.log("DB 연결 중...");
    pool = new sql.ConnectionPool(sqlConfig);
    await pool.connect();
    console.log("DB 연결 성공");
    return pool;
  } catch (err) {
    console.error("DB 연결 실패:", err);
    throw err; // 호출자에게 예외 전달
  }
};

process.on("SIGINT", async () => {
  if (pool) {
    try {
      console.log("DB 연결 종료 중...");
      await pool.close();
      console.log("DB 연결 종료 성공");
    } catch (err) {
      console.error("DB 연결 종료 중 오류:", err);
    }
  }
  process.exit();
});
