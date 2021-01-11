const bodyParser = require('body-parser') // CONVERTER O BODY
const cors = require('cors') // CROSS ORIGIN
const express = require('express')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
    app.use(express.static('public'));
}