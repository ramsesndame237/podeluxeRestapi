module.exports = {
  HOST: "postgresql-innov.alwaysdata.net",
  USER: "innov",
  PASSWORD: "QVdYvinrR7i@dLA",
  DB: "innov_podeluxe",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  } 
};
  // module.exports = {
  //   HOST: "localhost",
  //   USER: "postgres",
  //   PASSWORD: "root2022",
  //   DB: "podeluxe",
  //   dialect: "postgres",
  //   pool: {
  //     max: 5,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  //   }
  // };
