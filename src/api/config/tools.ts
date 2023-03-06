import type { AxiosResponse } from "axios"
import PubSub from "./PubSub"

const pubSub = new PubSub()

pubSub.subscribe(400,(response: AxiosResponse<any,any>) => {
    console.log(response.data)
})

export default pubSub