const mongoose = require('mongoose')
mongoose.set('debug', true)
const RunFlowSchema = new mongoose.Schema({
    flowId: { type: mongoose.Types.ObjectId, required: true, unique: true },
    structure: {type:Object}
}, { timestamps: true })
module.exports = mongoose.model('RunFlowNew', RunFlowSchema,'runflowsnew')