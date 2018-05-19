import { ConnectionOptions, createConnection } from "typeorm"
import { root } from "./paths"
import { User } from "./entity/user"
import { Message } from "./entity/message"

const options: ConnectionOptions = {
  type: "sqlite",
  database: `${root}/data/line.sqlite`,
  entities: [ User, Message ],
  logging: true
}

async function main () {
  const connection = await createConnection(options)
  const messageRepository = connection.getRepository(Message)
  const allMessages = await messageRepository.find()
  // メッセージを検索する
  allMessages.forEach((message: Message) => {
    const text = message.text
    if (!text) {
      return
    }
    if (text.match(/ape/)) {
      console.log(text)
    }
  })
  // メッセージと送信者を紐付ける
  const messages = await messageRepository
    .createQueryBuilder("ZMESSAGE")
    .leftJoinAndSelect("ZMESSAGE.sender", "ZUSER")
    .where("ZMESSAGE.Z_PK=:id")
    .setParameter("id", 3)
    .getMany()
  console.log(messages[0].sender)
}

main().catch(console.error)
