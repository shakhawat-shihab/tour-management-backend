const Tour = require("../models/Tour")

exports.getToursService = async (req, res, next) => {
    const tours = await Tour.find({});
    return tours;
}