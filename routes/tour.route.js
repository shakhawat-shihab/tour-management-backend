const express = require('express');
const tourController = require('../controllers/tour.controller');
const viewCount = require('../middleware/viewCount');
const route = express.Router()


route.get('/', tourController.getTours)
route.post('/', tourController.createTour)

route.get('/trending', tourController.getTrendingTours)
route.get('/cheapest', tourController.getCheapestTours)


route.get('/:id', viewCount, tourController.getSingleTour)
route.patch('/:id', tourController.updateTour)


module.exports = route;