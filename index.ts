// import app from "./app";
import scrap from "./scraper";
import initWhatsapp from "./service/whatsapp-service";

const start = async () => {
  // app.listen(8080, () => {
  //   console.log("Listening on port 8080");
  // });
  console.log("starting app");

  const whatsappClient = await initWhatsapp();

  scrap(whatsappClient);
};

start();
