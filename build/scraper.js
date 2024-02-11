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
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = "https://roobai.com/";
const wait = (msec) => new Promise((resolve, _) => {
    setTimeout(resolve, msec);
});
const scrap = (whatsappClient) => __awaiter(void 0, void 0, void 0, function* () {
    const prodArray = [];
    const browser = yield puppeteer_1.default.launch();
    console.log("browser launched");
    const page = yield browser.newPage();
    yield page.goto(url);
    console.log("url loaded");
    while (true) {
        console.log("evaluation started");
        try {
            const res = yield page.evaluate(() => {
                return Array.from(document.getElementsByClassName("single-products")).map((prod) => {
                    return {
                        title: prod.getElementsByClassName("post-title")[0].innerText.replace("₹", ""),
                        offerPrice: prod.getElementsByClassName("off-price")[0].innerText,
                        currentPrice: prod.getElementsByClassName("cur-price")[0].innerText,
                        discountPercent: Number.parseInt(prod.getElementsByClassName("discount-rb")[0]
                            .innerText),
                    };
                });
            });
            console.log("evaluation done");
            res
                .filter((res) => res.discountPercent > 20)
                .forEach((product) => {
                if (!prodArray.includes(product.title)) {
                    prodArray.push(product.title);
                    console.log(product);
                    whatsappClient.sendMessage("917200632341@c.us", `TITLE: ${product.title}\n OFFER PRICE: ${product.offerPrice}\nMRP PRICE: ${product.currentPrice}\nDISCOUNT: ${product.discountPercent}`);
                }
            });
            yield wait(10000);
            yield page.reload();
            console.log("reloaded page");
        }
        catch (e) {
            console.log(e);
        }
    }
    yield browser.close();
});
exports.default = scrap;
