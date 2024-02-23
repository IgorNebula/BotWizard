import { Telegraf, session } from "telegraf";
import { IConfigService } from "./Configs/Config.InterfaceConfig";
import { MyContext } from "../contexts/MyContext";
import { Stage } from "telegraf/typings/scenes";
import LocalSession from "telegraf-session-local";

export class BotApp {
  private bot: Telegraf<MyContext>;

  constructor(configService: IConfigService, private stage: Stage<MyContext>) {
    this.bot = new Telegraf<MyContext>(configService.get("TOKEN_BOT"));

    this.stage = stage;
  }

  init() {
    this.bot.use(
      new LocalSession({ database: "session_db.json" }).middleware()
    );

    this.bot.use(this.stage.middleware(), (ctx, next) => {
      const now = new Date();
      ctx.myContextProp = now.toString();
      ctx.session.id = ctx.from?.id === undefined ? 0 : ctx.from.id;
      ctx.session.name =
        ctx.from?.first_name === undefined ? "" : ctx.from.first_name;
      ctx.session.lastname =
        ctx.from?.last_name === undefined ? "" : ctx.from.last_name;
      return next();
    });

    this.bot.command("start", async (ctx) => {
      await ctx.replyWithHTML(
        `Привет, <b>${ctx.from?.first_name}</b>!` + txt[0]
      );
      await ctx.scene.enter("maimMenu");
    });
    //("super-wizard"));
    this.bot.launch();
    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }
}
 
const txt = [
  `
  Меня зовут <b>Игорь</b>.
   Я аналитик и программист.Мне нравится заниматься профессиональной разработкой и поддержкой чат-ботов,и заинтересован помочь Вам,
  создать под Ваши задачи чат-ботов - ставшие популярными, полезными и круглосуточными <u>помощниками в многих сферах бизнеса: управления, коммуникации, торговли</u>.
   . `,
];