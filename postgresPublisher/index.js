const { v4: uuidv4 } = require("uuid");
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

let intervalCount = 0;

const createRows = setInterval(function () {
  if (intervalCount === 10) {
    clearInterval(createRows);
    process.exit();
  } else {
    intervalCount += 1;
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();
    const uuid3 = uuidv4();
    const uuid4 = uuidv4();
    try {
      const queryConfig = {
        text:
          'INSERT INTO generic_row ("uuid1", "uuid2", "uuid3", "uuid4", "status", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [
          uuid1,
          uuid2,
          uuid3,
          uuid4,
          "Pending",
          "Wed, 14 Jun 2017 07:00:00 GMT",
          "Wed, 14 Jun 2017 07:00:00 GMT",
        ],
      };
      pgClient.query(queryConfig, (err, res) => {
        if (err) console.log(err);
        else {
          console.log("row inserted");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}, 3000);
