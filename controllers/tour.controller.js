const { getToursService, createTourService, getSingleTourService, updateTourService, getTrendingToursService, getCheapestToursService } = require("../services/tour.service")

exports.getTours = async (req, res, next) => {
    try {
        const query = {}
        let filters = { ...req.query };
        if (filters?.fields) {
            query.fields = filters.fields.replace(/\b,\b/g, match => ' ');
        }
        if (filters?.sort) {
            query.sort = filters.sort.replace(/\b,\b/g, match => ' ');
        }
        if (filters?.page) {
            const { limit = 3, page = 1 } = filters;
            const skip = (page - 1) * parseInt(limit);
            query.skip = skip;
            query.limit = +limit;
        }
        // console.log(query)
        const tours = await getToursService(query);
        return res.status(200).json({ status: 'success', message: 'data loaded successfully', data: tours })
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'failed to load data', error: error.message })
    }
}

exports.getSingleTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tours = await getSingleTourService(id);
        return res.status(200).json({ status: 'success', message: 'data loaded successfully', data: tours })
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'failed to load data', error: error.message })
    }
}

exports.getTrendingTours = async (req, res, next) => {
    try {
        const tours = await getTrendingToursService();
        return res.status(200).json({ status: 'success', message: 'data loaded successfully', data: tours })
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'failed to load data', error: error.message })
    }
}

exports.getCheapestTours = async (req, res, next) => {
    try {
        const tours = await getCheapestToursService();
        return res.status(200).json({ status: 'success', message: 'data loaded successfully', data: tours })
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'failed to load data', error: error.message })
    }
}


exports.createTour = async (req, res, next) => {
    try {
        const result = await createTourService(req.body)
        return res.status(200).json({ status: 'success', message: 'data inserted successfully', data: result })
    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'data is not inserted', error: error.message })
    }
}

exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateTourService(id, req.body);
        if (result?.modifiedCount) {
            return res.status(200).json({ status: 'success', message: 'data updated successfully', data: result })
        }
        res.status(400).json({ status: 'fail', message: 'failed to update data' })

    } catch (error) {
        return res.status(400).json({ status: 'fail', message: 'failed to update data', error: error.message })
    }
}




