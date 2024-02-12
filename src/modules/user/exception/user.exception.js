export class UserAlreadyExistException extends Error {
  constructor() {
    super("this login already exist!");
    this.statusCode = 400;
  }
}
export class UserBadRequestException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

export class UserNotFoundException extends Error {
  constructor() {
    super("User not found by login");
    this.statusCode = 404;
  }
}

export class UserPasswordWrongException extends Error {
  constructor() {
    super("Wrong password!");
    this.statusCode = 400;
  }
}

export class UserNotFoundByIdException extends Error {
  constructor() {
    super("User not found by id");
    this.statusCode = 404;
  }
}
