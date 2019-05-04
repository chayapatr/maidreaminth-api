const express = require('express')
const fs = require('fs')
const util = require('util')

const app = express()
const PORT = 3000

let rawMenu = fs.readFileSync('menu.json');
let menu = JSON.parse(rawMenu);

app.get('/menu', (req, res) => {
    return res.status(200).send({
        success: true,
        data: menu
    })
})

app.get('/menu/:cat', (req, res) => {
    const cat = req.params.cat
    if (cat) {
        if(menu[cat]) {
            res.status(200).send({
                success: true,
                data: menu[cat]
            })
        } else {
            res.status(404).send({
                success: false,
                data: 'not found'
            })
        }
    } else {
        res.status(400).send({
            success: false,
            data: 'missing parameter'
        })
    }
})

app.get('/menu/:cat/:food', (req, res) => {
    const cat = req.params.cat
    const food = req.params.food
    console.log(cat, food)
    if (food) {
        if (menu[cat][food]) {
            res.status(200).send({
                success: true,
                data: menu[cat][food]
            })
        } else {
            res.status(404).send({
                success: false,
                data: 'not found'
            })
        }
    } else {
        res.status(400).send({
            success: false,
            data: 'missing parameter'
        })
    }
})

app.listen(PORT, () => {
    console.log(`app run on port ${PORT}`);
})