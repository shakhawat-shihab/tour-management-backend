const Tour = require("../models/Tour")

exports.getToursService = async (query) => {
    console.log(' query ', query)
    const tours = await Tour.find({}).sort(query.sort).select(query.fields).skip(query.skip).limit(query.limit);
    const totalTours = await Tour.countDocuments({});
    const pageCount = Math.ceil(totalTours / query.limit);
    return { totalTours, pageCount, tours }
}

exports.getSingleTourService = async (id) => {
    const tour = await Tour.findById(id);
    return tour;
}

exports.getTrendingToursService = async () => {
    const tour = await Tour.find().sort({ viewCount: -1 }).limit(3);
    return tour;
}

exports.getCheapestToursService = async () => {
    const tour = await Tour.find().sort({ price: 1 }).limit(3);
    return tour;
}


exports.createTourService = async (data) => {
    const tour = new Tour(data)
    const result = await tour.save();
    result.logger();
    return result;
}

exports.updateTourService = async (id, data) => {
    const result = await Tour.updateOne({ _id: id }, { $set: data }, { runValidators: true })
    return result;
}

exports.up