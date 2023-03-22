const FlowModel = require('../Models/Flow')
const NodeModel = require('../Models/Node')
const RunFlow = require('../Models/RunFlow')
const RunFlowNew = require('../Models/RunFlowNew')
const { v4: uuidv4 } = require('uuid');
const { Deploy, DeployNew } = require('../Helpers/deploy')
// exports.CreateFlow = async (req, res) => {
//     try {
//         const flowObj = new FlowModel({ name: `Flow-${uuidv4()}` })
//         const flow = await flowObj.save()
//         return res.status(200).json(flow)
//     } catch (error) {
//         throw error
//     }
// }
// exports.CreateNode = async (req, res) => {
//     try {
//         const flowID = req.params.flowID
//         const nodeObj = new NodeModel({ flowID })
//         const node = await nodeObj.save()
//         return res.status(200).json(node)
//     } catch (error) {
//         throw error
//     }
// },
exports.DeployRunFlow = async (req, res) => {
    try {
        const flowID = req.body.flowID
        const data = await Deploy(flowID)
       await RunFlow.findOneAndRemove(
            { "flowId": flowID}
        );
        const runFlowObj = new RunFlow({ ...data })
        const result = await runFlowObj.save()
        return res.status(200).send(data)
    } catch (error) {
        throw error
    }
}
exports.DeployRunFlowNew=async(req, res) => {
    try {
        const flowID = req.body.flowID
        const data = await DeployNew(flowID)
       await RunFlowNew.findOneAndRemove(
            { "flowId": flowID}
        );
        const runFlowObj = new RunFlowNew({ ...data })
        const result = await runFlowObj.save()
        return res.status(200).send(data)
    } catch (error) {
        throw error
    }
}
exports.FlowExcute = async (req, res) => {
    try {
        const flowID = req.body.flowID
        const runFlow = await RunFlow.findOne({ flowId: flowID })
        const structure = runFlow.structure;
        console.log(Object.keys(structure)[0])
    } catch (error) {
        throw error
    }
}