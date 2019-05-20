const express = require('express')
const apicache = require('apicache')
const axios = require('axios')
const ddos = require('ddos')
const bodyparser = require('body-parser')
const queue = require('express-queue')
const helmet = require('helmet')

const app = express()

let cache = apicache.middleware
const menu = require('./menu')

//Limit request balancer
onDenial = err => {
    console.warn(err);
}

const Ddos = new ddos({
    burst: 30,
    limit: 30,
    maxCount: 80,
    checkInterval: 5,
    onDenial,
    errormessage: "You have been blocked by attemped Too many requests, UMU"
})

app.use(cache('1 hour'))
app.use(Ddos.express)
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(queue({ activeLimit: 7, queuedLimit: -1 }));
app.use(bodyparser.json());
app.use(helmet());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: 'สวัสดีครับแอดมิน ใส่ชุดเมดให้ดูหน่อยครับ'
    })
})

app.get('/menu', (req, res) => {
    res.status(200).json({
        success: true,
        data: menu
    })
    res.end()
})

app.get('/menu/:cat', (req, res) => {
    const cat = req.params.cat
    if (cat) {
        if (menu[cat]) {
            res.status(200).json({
                success: true,
                data: menu[cat]
            })
            res.end()
            return true
        } else {
            res.status(404).json({
                success: false,
                error: 'not found'
            })
            res.end()
            return false
        }
    } else {
        res.status(400).json({
            success: false,
            error: 'missing parameter'
        })
        res.end()
        return false
    }
})

app.get('/menu/:cat/:food', (req, res) => {
    const cat = req.params.cat
    const food = req.params.food
    if (food) {
        if (menu[cat][food]) {
            res.status(200).json({
                success: true,
                data: menu[cat][food]
            })
            res.end()
            return true
        } else {
            res.status(404).json({
                success: false,
                error: 'not found'
            })
            res.end()
            return false
        }
    } else {
        res.status(400).json({
            success: false,
            error: 'missing parameter'
        })
        res.end()
        return false
    }
})

app.get("*", (req, res) => {
    res.status(404).json({"error": "not found"});
    res.end();
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`> Running on port ${PORT} desu!`);
})