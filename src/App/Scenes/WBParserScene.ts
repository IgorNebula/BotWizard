import { Composer, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";



const handler = new Composer<MyContext>();
handler.action('exit',async(ctx)=>{
return ctx.scene.enter('BotsScene');
})

 const wbScene = new Scenes.WizardScene("WBScene", async (ctx,next) => {
  await ctx.reply("Идет обработка данных от вайлбериз");
 
 
},handler);
