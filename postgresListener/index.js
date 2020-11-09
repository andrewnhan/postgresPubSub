const pg = require("pg");

const config = {
  username: "admin",
  password: "admin",
  database: "generic_database",
  port: 5432,
  host: "127.0.0.1",
  dialect: "postgres",
};

const connectionString = `postgres://${config.username}:${config.password}@${config.host}/${config.database}`;

const pgClient = new pg.Client(connectionString);
pgClient.connect();

const listenerQuery = pgClient.query("LISTEN new_generic_row");

pgClient.on("notification", async (data) => {
  const payload = JSON.parse(data.payload);
  console.log("---------- ROW ADDED ----------\n");
  console.log(payload);
});
