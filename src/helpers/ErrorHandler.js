class ErrorHandler extends Error {
  constructor(customMessage, statusCode = 500, url,details) {
    super(customMessage, statusCode, details);
    this.customMessage = customMessage;
    this.statusCode = statusCode;
    this.details = details;
    this.url = url;
    this.timestamp = new Date()
  }

  getCustomMessage() {
    return this.customMessage;
  }
  getStatusCode() {
    return this.statusCode;
  }
  getDetails() {
    return this.details;
  }
  getResponseError() {
    return {
      meta:{
        status: this.statusCode,
        url: this.url,
        timestamp : this.timestamp,
      },
      error:{
        message: this.customMessage,
        details: this.details,
      }
    };
  }
}
export default ErrorHandler;