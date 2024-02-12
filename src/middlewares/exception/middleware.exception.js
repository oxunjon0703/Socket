export class TokenRequiredException extends Error {
  constructor() {
    super("token must be required!");
    this.statusCode = 401;
  }
}
