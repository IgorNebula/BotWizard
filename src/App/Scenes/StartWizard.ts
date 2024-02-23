import { Composer, Markup, Scenes } from "telegraf";
import { MyContext } from "../../contexts/MyContext";

export const startWizard =new Composer<MyContext>();
startWizard.on('text',async ctx=>{
    await ctx.reply('Назови имя:');
    return ctx.wizard.next();
});

export const nameWizard = new Composer<MyContext>();
nameWizard.on('text',async (ctx) => {
    ctx.session.name = ctx.message.text;
  await ctx.reply("Назови фамилию:");
  return ctx.wizard.next();
});

export const mailWizard = new Composer<MyContext>();
mailWizard.on('text',async ctx=>{
    
   ctx.session.lastname = ctx.message.text;
    await ctx.reply('Напиши почту');
    return ctx.wizard.next();
});
export const resultWizard = new Composer<MyContext>();
resultWizard.on('text',async ctx=>{
    ctx.session.email = ctx.message.text;
    await ctx.reply(`${ctx.session.name}_${ctx.session.lastname}_${ctx.session.email}`,
    Markup.inlineKeyboard([
        Markup.button.callback('confirm','confirm'),
        Markup.button.callback('retrive','retrive')
    ])
    );
    return ctx.wizard.next();
})
export const endWizard = new Composer<MyContext>();
endWizard.action("confirm", async (ctx) => {
  await ctx.editMessageText("Done");
  await ctx.scene.leave();
});
endWizard.action('retrive', async ctx=>{
    await ctx.editMessageText('repeat enter');
     ctx.wizard.selectStep(0);
     return ctx.scene.reenter();
})
endWizard.use( ctx=>{
   ctx.reply('Bay!');
  return ctx.scene.enter('super-wizard');  
});

export const startScene = new Scenes.WizardScene('startWizard', startWizard, nameWizard, mailWizard,resultWizard,endWizard);