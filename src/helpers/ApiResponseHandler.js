class ApiResponseHandler {
    constructor(){
        this.meta = {}
        this.data = {}
    }

    setMeta (key,value){
        this.meta[key] = value
    }
    setData (key,value){
        this.data[key] = value
    }
    getApiResponse(){
        return {
            meta: this.meta,
            data: this.data
        }
    }
}
export default ApiResponseHandler