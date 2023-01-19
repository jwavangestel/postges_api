const {Client} = require('pg')

const client = new Client({
    host: "janenlenneke.nl",
    user: "postgres",
    port: 5432,
    password: "280558Hm1*pg",
    database: "postgres"
})

module.exports = client