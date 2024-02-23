import { IConfigService } from "../Core/Configs/Config.InterfaceConfig";

export class WeatherSevice {
  private token: any;
  constructor(configService: IConfigService) {
    this.token = configService.get("TOKEN_WEATHER");
  }
}
