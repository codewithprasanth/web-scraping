import mongoose from "mongoose";
import qrCode from "qrcode-terminal";
import { Client, LocalAuth, RemoteAuth } from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";

let whatsappClient: Client;

const initWhatsapp = async () => {
  //   const mongo = await mongoose.connect(
  //     "mongodb+srv://admin:OvRRsTtGPC9Hj6EZ@mycluster.crq6eyr.mongodb.net/?retryWrites=true&w=majority"
  //   );
  //   const store = new MongoStore({ mongoose: mongo });

  //   whatsappClient = new Client({
  //     authStrategy: new RemoteAuth({
  //       store: store,
  //       backupSyncIntervalMs: 60000,
  //     }),
  //   });

  whatsappClient = new Client({
    authStrategy: new LocalAuth(),
  });

  whatsappClient.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrCode.generate(qr, { small: true });
  });

  whatsappClient.on("ready", () => {
    console.log("READY");
  });

  whatsappClient.on("message", async (msg) => {
    console.log("MESSAGE RECEIVED", msg);

    try {
      const contact = msg.getContact();
      console.log(contact, msg.body);
    } catch (err) {
      console.log(err);
    }
  });

  await whatsappClient.initialize();

  return whatsappClient;
};

export default initWhatsapp;
