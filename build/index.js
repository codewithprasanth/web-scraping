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
// import app from "./app";
const scraper_1 = __importDefault(require("./scraper"));
const whatsapp_service_1 = __importDefault(require("./service/whatsapp-service"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // app.listen(8080, () => {
    //   console.log("Listening on port 8080");
    // });
    console.log("starting app");
    const whatsappClient = yield (0, whatsapp_service_1.default)();
    (0, scraper_1.default)(whatsappClient);
});
start();
