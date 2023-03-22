const mongoose = require('mongoose')
const FlowSchema = new mongoose.Schema({
    id:Number,
    name:String
},{timestamps:true})
module.exports=mongoose.model('Flow',FlowSchema,'flow')