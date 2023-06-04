
class customError extends Error {
    constructor(message,statusCode){
        this.message = message;
        this.statusCode = statusCode
    }

    setError(){
        {
           meta:{
            status: false
            api: 'api/endpoint'
           }
           error:{
            statusCode: this.statusCode
            message: this.message
           }

        }
    }

}

