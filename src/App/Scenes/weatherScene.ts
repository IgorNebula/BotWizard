import { Composer, Markup, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";
import axios from "axios";
const handler = new Composer<MyContext>();
const wthUrl = "https://api.openweathermap.org/data/2.5/weather?"; //lat={lat}&lon={lon}&appid={API key}";
handler
  .action("exit", async (ctx) => {
    return ctx.scene.enter("botsScene");
  })
  .on("location", async (ctx) => {
    if (ctx.message.location) {
      let loc = ctx.message.location;
      axios
        .get(
          wthUrl +
            `lang=${ctx.from.language_code}&lat=${loc.latitude}&lon=${loc.longitude}&appid=${process.env.TOKEN_WEATHER}&units=metric`
        )
        .then(async (res) => {
          await ctx.replyWithHTML(
            `погода:<b>${res.data.weather[0].description}</b>
             темп: <b>${res.data.main.temp}</b>°C`
          ); //data.weather[0].main}
        });
    }
  })
  .use(async (ctx, next) => {
    ctx.reply(
      "для получения погоды нужно указать локацию",
      Markup.keyboard([Markup.button.locationRequest("отправить")])
        .resize()
        .oneTime()
    );
  });

export const weatherScene = new Scenes.WizardScene("weatherScene", handler);
