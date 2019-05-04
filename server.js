const express = require('express')
const apicache = require('apicache')
const axios = require('axios')
const ddos = require('ddos')
const app = express()
const PORT = 3000

let cache = apicache.middleware
const menu = require('./menu')

//Limit request balancer
onDenial = err => {
    console.warn(err);
}

const Ddos = new ddos({
    burst: 30,
    limit: 30,
    maxCount: 60,
    checkInterval: 5,
    onDenial,
    errormessage: "You have been blocked, Too many requests"
})

app.use(cache('5 minutes'))
app.use(Ddos.express)

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
    console.log(cat, food)
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
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})