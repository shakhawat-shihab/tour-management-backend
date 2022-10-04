const { getToursService } = require("../services/tour.service")

exports.getTours = async (req, res, next) => {
    try {
        const tours = await getToursService();
        return res.status(200).json({ status: 'success', message: 'data loaded successfully', data: tours })
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'failed to load data', error: error.message })
    }
}

