import { Context, Scenes } from "telegraf";


export interface MyWizardSession extends Scenes.WizardSessionData {
    myWizardSessionProp: number;
}

export interface MySession extends Scenes.WizardSession<MyWizardSession> {
    mySessionProp: number;
    id:number
    name:string;
    lastname:string;
    email:string;
}

export interface MyContext extends Context {
    myContextProp: string;
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}
