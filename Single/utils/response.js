module.exports = class {
    constructor(response) {
      this.response = response;
    }
  
    bind(response) {
      this.response = response;
    }
  
    ok(data) {
      return this.response.json(data);
    }
  
    created(data) {
      return this.response.status(201).json(data);
    }
  
    noContent() {
      return this.response.sendStatus(204);
    }
  
    badRequest(data) {
      return this.response.status(400).json(data);
    }
  
    notFound(data) {
      return this.response.status(404).json(data);
    }
  
    internalServerError(data) {
      return this.response.status(500).json(data);
    }
  
    content(data, statusCode = 200) {
      return this.response.status(statusCode).json(data);
    }
  };
  