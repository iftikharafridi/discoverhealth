import express from 'express';
import Database from 'better-sqlite3';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';

const app = express();
const db = new Database('./database.db', {verbose: console.log});


app.use(express.urlencoded({extended: false}));
app.use(express.json())

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', (req, res) =>{
    console.log("Welcome to discoverhealth app");
    //res.send("Welcome to discoverhealth app");
    res.render('index.html')
})

// APIs
// Get all the reseource in the region

app.get('/api/resources', (req, res) =>{
    const region = req.query.region;
    console.log("Hello")
    console.log(req.query.region)
    try {
        const stmt = db.prepare('select * from healthcare_resources where region = ?')
        const resources = stmt.all(region)
        res.json(resources)
    } catch(err){
        console.error(err)

    }
    
})

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
