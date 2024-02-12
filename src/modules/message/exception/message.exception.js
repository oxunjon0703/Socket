export class MessageBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
export class MessageNotFoundByIdException extends Error {
  constructor() {
    super("Message not found by id");
    this.statusCode = 404;
  }
}
