import express from 'express'
import {askQuestion} from './src/requests.js'
import cors from 'cors'
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());
app.options('*', cors());


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', async (req, res) => {
    const response = {
        data: 'Welcome to CHATAPI'
    };

    res.send(response);
});

app.get('/question', async (req, res) => {
    const question = req.query.q;

    if (!question) res.send({
        data: "You didn't send anything?"
    });
 
    const response = {
        data: await askQuestion(req.query.q)  
    };

    res.send(response);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
