import { Composer, Markup, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";
import { scrapMM } from "../integrateServices/megaMScraper";



const handler = new Composer<MyContext>();
handler.action('exit',async(ctx)=>{
  await ctx.scene.enter('mainMenu');
});
export const megaMScene = new Scenes.WizardScene('megaMScene',
async(ctx,next)=>{
   
  await ctx.reply('Идет поиск товаров со скидкой. Это может занять некотрое время')
  const dataObj =await scrapMM();
  for(const el of dataObj){
  await ctx.reply(`наименование: ${el.title}
    скидка:${el.discount}
    стоимость:${el.money}
    описание:${el.detail}
    ссылка: ${el.ref}`)
  }
   await ctx.reply('end',
   Markup.inlineKeyboard([
    Markup.button.callback('Выход в меню','exit')
   ])
   )
  return next;
},handler);
