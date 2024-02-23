import { Composer, Markup, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";

const handler = new Composer<MyContext>();

handler.action("exit", async (ctx) => {
  // await ctx.answerCbQuery();
  await ctx.deleteMessage();
  return ctx.scene.enter("maimMenu");
});
handler
  .action("bot_1", async (ctx) => {
    return ctx.scene.enter("weatherScene");
  })
  .action("bot_2", async (ctx) => {
    return ctx.scene.enter("megaMScene");
  });

export const botsScene = new Scenes.WizardScene(
  "botsScene",
  async (ctx) => {
    await ctx.answerCbQuery();
    ctx.wizard.cursor = 0;
    await ctx.editMessageText(
      "Выберите бота",
      Markup.inlineKeyboard([
        [Markup.button.callback("Узнать погоду", "bot_1")],
        [Markup.button.callback("МегаМаркет парсер", "bot_2")],
        [Markup.button.callback("menu", "exit")],
      ])
    );
    return ctx.wizard.next();
  },
  handler
);

const content: string[] = [
  "bot scene text1",
  "bot scene text2",
  "bot scene text3",
];
