const mongoose = require('mongoose')
const NodeSchema = new mongoose.Schema({
    id:{type:String},
    flowId:{type:mongoose.Schema.Types.ObjectId,require:true,ref:'Flow'},
    type:String,
    parent:{type:String,default:null},
    children:{type:mongoose.Schema.Types.Array,default:[]},
    excecutable:{type:mongoose.Schema.Types.String,default:""},
    operator:String
},{timestamps:true})
module.exports=mongoose.model('NodesNew',NodeSchema,'nodesnew')