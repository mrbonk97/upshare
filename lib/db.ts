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

const pool = new sql.ConnectionPool(sqlConfig);

export const getDbPool = async () => {
  console.log(sqlConfig);

  try {
    if (!pool.connected) {
      console.log("DB 연결중...");
      await pool.connect();
    }
    console.log("DB 연결 성공");
    return pool;
  } catch (err) {
    console.error("DB 연결 실패:", err);
    throw err;
  }
};
