const { ObjectId } = require("mongodb");
const Tour = require("../models/Tour");


const viewCount = async (req, res, next) => {


    try {
        const { id } = req.params;
        //console.log('object id', id);
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: 'Not a valid service Id ' })
        }
        const result = await Tour.updateOne({ _id: id }, { $inc: { viewCount: 1 } }, { runValidators: true })
        if (result?.modifiedCount) {
            // console.log(result);
            next()
        }
        else {
            return res.status(400).send({ success: false, message: 'cant update the view count ' })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ success: false, message: 'cant update the view count ', error: error.message })
    }
}
module.exports = viewCount