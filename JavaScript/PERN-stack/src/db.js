import pg from "pg";

export const pool = pg.Pool ({
    port: 5432,
    host: "localhost",
    user: "postgres",
    passwoed: "admin",
    database: "PERN",
});

pool.on("connect", () => {
    console.log("conectadi a la base de datos");
});