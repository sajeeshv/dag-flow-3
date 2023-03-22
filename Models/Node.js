const mongoose = require('mongoose')
const NodeSchema = new mongoose.Schema({
    id:{type:String},
    flowId:{type:mongoose.Schema.Types.ObjectId,require:true,ref:'Flow'},
    type:String,
    parent:{type:String,default:null},
    children:{type:mongoose.Schema.Types.Array,default:[],ref:'Nodes',   autopopulate: {select:{excecutable:1,_id:0}}},
    excecutable:{type:mongoose.Schema.Types.String,default:""},
    operator:String
},{timestamps:true})
NodeSchema.plugin(require('mongoose-autopopulate'));
module.exports=mongoose.model('Nodes',NodeSchema,'nodes')