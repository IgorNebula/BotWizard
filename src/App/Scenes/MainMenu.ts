import { Composer, Markup, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";

const stepHandler = new Composer<MyContext>();
stepHandler
  .action("info", (ctx) => {
    ctx.wizard.cursor = 0;
    return ctx.scene.enter("infoScene");
  })
  .action("view_bots", (ctx) => {
    ctx.wizard.cursor = 0;
    return ctx.scene.enter("botsScene");
  })
  .action("question", (ctx) => {
    ctx.wizard.cursor = 0;
    return ctx.scene.enter("questScene");
  });

export const mainMenu = new Scenes.WizardScene(
  "maimMenu",
  async (ctx) => {
    await ctx.replyWithHTML(
      "меню",
      Markup.inlineKeyboard([
        [Markup.button.callback("Информация о чат-ботах", "info")],
        [Markup.button.callback("Посмотреть демо-ботов", "view_bots")],
        [Markup.button.callback("Есть еще вопросы...", "question")],
      ])
    );
    return ctx.wizard.next();
  },
  stepHandler
);
