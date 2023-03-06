import axios from "axios"
import pubSub from "./tools"

const request = axios.create()

request.interceptors.request.use((config) => {

    return config
})

request.interceptors.response.use((response) => {
    if(response.status != 200){
        return Promise.resolve(response.data)
    }
    pubSub.notify('Auth')
    return response
},
err => {
    
})

export default request