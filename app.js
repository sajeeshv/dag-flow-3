const express = require('express')
const app = express()
const cors = require('cors')
const { DBConnect } = require('./Connection/connection')

const FlowController = require('./Controllers/FlowController')
const RunFlowController = require('./Controllers/RunFlowController')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('working')
})
app.post('/deploy', (req, res) => {
    FlowController.DeployRunFlow(req,res)
})
app.post('/deploynew', (req, res) => {
    FlowController.DeployRunFlowNew(req,res)
})
//SAMPLE REQUEST
app.post('/run',RunFlowController.RunWorkFlow(), async (req, res) => {
    try {
        return res.send({ "success": true, payload: req.body })
    } catch (error) {
        throw error
    }
})

app.post('/runnew',RunFlowController.RunWorkFlowNew(), async (req, res) => {
    try {
        return res.send({ "success": true, payload: req.body })
    } catch (error) {
        throw error
    }
})

const main = async (app) => {
    try {
        const result = await DBConnect()
        if (result) {
            app.listen(4001, () => {
                console.log("server running")
            })
        }
    } catch (error) {
        throw error
    }
}
main(app)