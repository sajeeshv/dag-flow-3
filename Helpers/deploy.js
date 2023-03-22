const NodeModel = require('../Models/Node')
const NodeNewModel = require('../Models/NodesNew')
const flowObj={}
exports.Deploy = async(flowId)=>{
    try {
        if(!flowId){
            throw new Error("no flow detaisl recieved");
        }
        flowObj.flowId=flowId,
        flowObj.structure={}
    //    const flow = await GetDeployableFlow({flowId:flowId,parent:null},flowId)
       const flow = await GetDeployableFlow({flowId:flowId,parent:null},flowId)
       return flow
    } catch (error) {
        throw error
    }
}
const GetDeployableFlow =async(condition,flowId)=>{
    try {
        const node = await NodeModel.findOne(condition)
        const data={
            flowId:node.flowId,
            structure:[{excecutable:node.excecutable,children:[...node.children]}]
        }
        return data
    } catch (error) {
        throw error 
    }
}
exports.DeployNew = async(flowId)=>{
    try {
        if(!flowId){
            throw new Error("no flow detaisl recieved");
        }
        flowObj.flowId=flowId,
        flowObj.structure={}
       const flow = await GetDeployableFlowNew({flowId:flowId,parent:null},flowId)
       return flow
    } catch (error) {
        throw error
    }
}
const GetDeployableFlowNew =async(condition,flowId)=>{
    try {
        const node = await NodeNewModel.findOne(condition)
        flowObj.structure[node.id]={}
        flowObj.structure[node.id].node=node.excecutable
        flowObj.structure[node.id].children=node.children
        flowObj.structure[node.id].parent=node.parent
        if(node.children.length){
            for(x of node.children){
                await GetDeployableFlowNew({flowId:flowId,id:x},flowId)
            } 
        }
        return flowObj
    } catch (error) {
        throw error 
    }
}





 