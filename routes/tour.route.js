const express = require('express');
const tourController = require('../controllers/tour.controller');
const route = express.Router()

route.get('/', tourController.getTours)




module.exports = route;