import { Scenes } from "telegraf";
import { MyContext } from "../contexts/MyContext";
import { BotApp } from "../Core/Bot";
import { ConfigService } from "../Core/Configs/config.service";
import { botsScene } from "./Scenes/BotsScene";
import { infoScene } from "./Scenes/InfoScene";
import { mainMenu } from "./Scenes/MainMenu";
import { questScene } from "./Scenes/QuestDev";
import { weatherScene } from "./Scenes/weatherScene";
import { megaMScene } from "./Scenes/MegaMScene";




const stage = new Scenes.Stage<MyContext>(
  [mainMenu, infoScene, botsScene, questScene, weatherScene,megaMScene],
  {
    ttl: 10,
    default: "mainMenu",
  }
);
export const Appbot = new BotApp(new ConfigService(), stage);

