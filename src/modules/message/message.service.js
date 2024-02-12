import { MessageEntity } from "./entity/message.entity.js";
import { DataSource } from "../../lib/datasource.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ResData } from "../../lib/resData.js";
import { MessageNotFoundByIdException } from "./exception/message.exception.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class MessageService {
  async create(dto, currentUser) {
    const newMessage = new MessageEntity(currentUser.id, dto.message, dto.to);

    const messageDirection = join(
      __dirname,
      "../../../database",
      "messages.json"
    );

    const messageDataSource = new DataSource(messageDirection);

    const messages = messageDataSource.read();
    messages.push(newMessage);

    messageDataSource.write(messages);

    const resData = new ResData("message created", 201, newMessage);

    return resData;
  }

  async getAll() {
    const messageDirection = join(
      __dirname,
      "../../../database",
      "messages.json"
    );

    const messageDataSource = new DataSource(messageDirection);

    const messages = messageDataSource.read();

    const resData = new ResData("all messages", 200, messages);

    return resData;
  }

  async getMessageById(id) {
    const messageDirection = join(
      __dirname,
      "../../../database",
      "messages.json"
    );

    const messageDataSource = new DataSource(messageDirection);

    const messages = messageDataSource.read();
    const foundMessagesById = messages.find((message) => message.id === id);

    if (!foundMessagesById) {
      throw new MessageNotFoundByIdException();
    }

    const resData = new ResData("foun message by id", 200, foundMessagesById);

    return resData;
  }
}
