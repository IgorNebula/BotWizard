import { Composer, Markup, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";
const handler1 = new Composer<MyContext>();
const handler2 = new Composer<MyContext>();
const handler3 = new Composer<MyContext>();
const handler4 = new Composer<MyContext>();

handler1
  .use(async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.deleteMessage();
    await ctx.replyWithHTML(
      content[0],
      Markup.inlineKeyboard([
        Markup.button.callback("Заказать или Отправить заявку", "order"),
        Markup.button.callback("вернуться в меню", "exit"),
      ])
    );
    return ctx.wizard.next();
  })
  handler2.action("order", async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.reply('напишите разработчику здесь.')
    return ctx.wizard.next();
  }).action('exit',async ctx =>{
    await ctx.answerCbQuery();
    return ctx.scene.enter('mainMenu');
  });
  handler3.on('message', async (ctx) => {
     
    
    return ctx.wizard.next();
  })
  

export const questScene = new Scenes.WizardScene(
  "questScene",
  handler1,
  handler2,
  handler3,
  handler4
);

const content: string[] = [
  `❓<b>Как происходит процесс разработки?</b>
  ℹ️ В разработке чат-бота я использую язык программирования Typescript и надежные библиотеки такие как Telegraf,и базы данных: MySQL, PostgreSQL, SQLite, MongoDB и многие современные технологии, что дает Вам полный контроль и больше возможности для гибкого индивидуального подхода, чем конструкторы.
  ❓<b>Что нужно для разработки?</b>
  ℹ️ Для разработки, от Вас нужны материалы(текст, фото и т.д.), тех задание или описание того что вы хотите получить.
  ❓<b>Какие этапы включает разработка чат-бота?</b>
  ℹ️  Разработка состоит из этапов: 
 - анализа, уточнения, утверждения.
- проектирование интерфейса, написание кода.
- тестируете результат. Развертывание на сервере.
❓<b>Сколько времени занимает разработка?</b>
ℹ️ Разработка может занять от одного дня до недель, в зависимости от объема и сложности работ.
❓<b>Что входит в сопровождение чат-бота после разработки?</b>
ℹ️ В сопровождение входить обновление системы до новых версий, чтобы была бесперебойная работа на случай, если какие-то платформы внесут изменения.
❓<b>Могу ли я контролировать процесс разработки?</b>
ℹ️ Во время процесса разработки мы будем тесно сотрудничать.
❓<b>Как осуществляется оплата?</b>
ℹ️ Оплата проходит через биржи по безопасной сделке.


`,
  "question scene text2",
  "question scene text3",
];
