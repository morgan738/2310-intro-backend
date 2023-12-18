const pg = require('pg')
//postgres
const client = new pg.Client('postgres://localhost/acme_backend_dbz')
//postico
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/api/things', async (req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM things
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)
        
        
    } catch (error) {
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("connected to database")
    const SQL = `
        DROP TABLE IF EXISTS things;
        CREATE TABLE things(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            is_favorite BOOLEAN
        );
        INSERT INTO things (name) VALUES ('foo');
        INSERT INTO things (name, is_favorite) VALUES ('bar', true);
        INSERT INTO things (name) VALUES ('bazz');
    `
    await client.query(SQL)
    console.log("table created!")
    
    const port = 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })



}

init()