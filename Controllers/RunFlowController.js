const axios = require('axios')
const RunFlow = require('../Models/RunFlow')
const RunFlowNew = require('../Models/RunFlowNew')

let returnObj = {}

const GetWheatherData = async (props) => {
    //console.log(`https://fcc-weather-api.glitch.me/api/current?lon=${props && props.lon ? props.lon :77}&lat=${props && props.lat ? props.lat :20}`)
    try {
        // const response = await axios.get(`https://fcc-weather-api.glitch.me/api/current?lon=${props && props.lon ? props.lon :76.11}&lat=${props && props.lat ? props.lat :11.12}`);
        // return response.data
        const sampleResponse = {
            coord: { lon: 76.11, lat: 11.12 },
            weather: [
                {
                    id: 801,
                    main: 'Clouds',
                    description: 'few clouds',
                    icon: 'https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F02d.png?1499366021821'
                }
            ],
            base: 'stations',
            main: {
                temp: 27.4,
                feels_like: 29.45,
                temp_min: 27.4,
                temp_max: 27.4,
                pressure: 1010,
                humidity: 69
            },
            visibility: 6000,
            wind: { speed: 3.09, deg: 340 },
            clouds: { all: 20 },
            dt: 1660624146,
            sys: {
                type: 1,
                id: 9209,
                country: 'IN',
                sunrise: 1660610729,
                sunset: 1660655678
            },
            timezone: 19800,
            id: 1263694,
            name: 'Manjeri',
            cod: 200
        }
        return sampleResponse
    } catch (error) {
        throw error
    }
}
const GetPostalData = async (props) => {
    try {
        const response = await axios.get(`https://api.zippopotam.us/us/10002`);
        return response.data
    } catch (error) {
        throw error
    }
}
//..........................................................................
exports.RunWorkFlow = () => {
    try {
        return async function (req, res, next) {
            const flowId = req.body.flowId
            const flow = await RunFlow.findOne({flowId})
            let payload = {}
            if (req.body.type.toLowerCase() === 'weather') {
                const wheatherData = await GetWheatherData()
                payload = wheatherData
            } else if (req.body.type.toLowerCase() === 'postalcode') {
                const postalData = await GetPostalData()
                payload = postalData
            } else {
                payload = req.body
            }
            const data = await ExcecuteWorkFlow(flow.structure, payload)
            req.body = data
            next()
        }
    } catch (error) {
        throw error
    }
}

ExcecuteWorkFlow = async (nodeList, payload) => {
    try {
        if(nodeList.length){
        for (node of nodeList) {
            if (node.excecutable) {
                console.log(node.excecutable)
                const func = await CreateFunction(node.excecutable)
                returnData = await ExecuteFunctions(func,payload)
                console.log(returnData)
                if (!returnData) {
                    continue
                } else {
                    if (typeof returnData !== 'boolean') {
                        payload = returnData
                    }
                    await ExcecuteWorkFlow(node.children, payload)
                    if(!node.children.length){
                        break
                    }
                }
            }
        }
    }
        returnObj =payload['final_out'] ? payload['final_out'] : payload
        return returnObj
    } catch (error) {
        throw error
    }
}


exports.RunWorkFlowNew = () => {
    try {
        return async function (req, res, next) {
            const flowId = req.body.flowId
            const flow = await RunFlowNew.findOne({flowId})
            const currentNode = [Object.keys(flow.structure)[0]]
           
            let payload = {}
            if (req.body?.type.toLowerCase() === 'weather') {
                const wheatherData = await GetWheatherData()
                payload = wheatherData
            } else if (req.body?.type.toLowerCase() === 'postalcode') {
                const postalData = await GetPostalData()
                payload = postalData
            } else {
                payload = req.body
            }
            const data = await ExcecuteWorkFlowNew(flow.structure,currentNode, payload)
            req.body = data
            next()
        }
    } catch (error) {
        throw error
    }
}

ExcecuteWorkFlowNew = async (nodeList, currentNode,payload) => {
    try {
        if(currentNode.length){
        for (node of currentNode) {
            console.log(node)
            if (nodeList[node].node) {
                console.log(nodeList[node].node)
                const func = await CreateFunction(nodeList[node].node)
                returnData = await ExecuteFunctions(func,payload)
                console.log(returnData)
                if (!returnData) {
                    continue
                } else {
                    if (typeof returnData !== 'boolean') {
                        payload = returnData
                    }
                    
                    await ExcecuteWorkFlowNew(nodeList,nodeList[node].children, payload)
                    if(!nodeList[node].children.length){
                        break
                    }
                }
            }
        }
    }
        returnObj =payload['final_out'] ? payload['final_out']:payload
        return returnObj
    } catch (error) {
        throw error
    }
}


CreateFunction = (functionString) => {
    try {
        return eval(functionString)
    } catch (error) {
        throw error
    }
}
ExecuteFunctions = async (func,payload) => {
    try {
        let result = "";
        console.log('payload',payload)
        if (func.constructor.name === 'AsyncFunction') {
            result = await func(payload)
        } else {
            result = func(payload)
        }
        return result
    } catch (error) {
        throw error
    }
}

