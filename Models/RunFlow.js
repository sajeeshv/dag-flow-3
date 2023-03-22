const mongoose = require('mongoose')
mongoose.set('debug', true)
const ChildrenSchema = new mongoose.Schema(
    {
        excecutable: String,
        children: [{}]
    }, { _id: false })
const StructureSchema = new mongoose.Schema(
    {
        excecutable: String,
        children: [ChildrenSchema]
    }, { _id: false })

const RunFlowSchema = new mongoose.Schema({
    flowId: { type: mongoose.Types.ObjectId, required: true, unique: true },
    structure: [StructureSchema]
}, { timestamps: true })
module.exports = mongoose.model('RunFlow', RunFlowSchema,'runflows')