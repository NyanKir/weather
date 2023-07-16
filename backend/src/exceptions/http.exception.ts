export class HttpException extends Error {
  status: number;
  constructor(status: number, message: any) {
    super(message);

    this.message = message;
    this.status = status;
  }
}

export class ErrorBuilder {
  static BadRequest(message?: any) {
    return new HttpException(400, message || 'Bad request');
  }
  static Forbidden(message?: any) {
    return new HttpException(403, message || 'Forbidden');
  }
}
