"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
let whatsappClient;
const initWhatsapp = () => __awaiter(void 0, void 0, void 0, function* () {
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
    whatsappClient = new whatsapp_web_js_1.Client({
        authStrategy: new whatsapp_web_js_1.LocalAuth(),
    });
    whatsappClient.on("qr", (qr) => {
        console.log("QR RECEIVED", qr);
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    whatsappClient.on("ready", () => {
        console.log("READY");
    });
    whatsappClient.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("MESSAGE RECEIVED", msg);
        try {
            const contact = msg.getContact();
            console.log(contact, msg.body);
        }
        catch (err) {
            console.log(err);
        }
    }));
    yield whatsappClient.initialize();
    return whatsappClient;
});
exports.default = initWhatsapp;
