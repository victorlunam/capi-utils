import { regex, MOBILE_KEYWORDS } from './constants';

type MatchSplitValue = string | undefined;

class DeviceInfo {
  // find all inside parenthesis with at least one semicolon
  private regex = /\(((?:[^;()]+;){1,}[^;()]*)\)/g;
  private rawDeviceInfo: string | null = null;

  name: string | null = null;
  runOn: string | null = null;
  model: string | null = null;

  screenSize: ScreenSize | null = null;
  isMobile: boolean = false;

  constructor(private readonly userAgent: string) {
    this.parse();
    this.setDeviceInfo();
  }

  private parse() {
    const match = this.userAgent.match(this.regex)?.[0];
    this.rawDeviceInfo = match?.replace(regex.REMOVE_PARENTHESIS, '') ?? null;
  }

  private setDeviceInfo() {
    if (!this.rawDeviceInfo) return;

    const [name, runOn, model] = this.rawDeviceInfo.split(';') as [MatchSplitValue, MatchSplitValue, MatchSplitValue];

    this.name = name?.trim() ?? null;
    this.runOn = runOn?.trim() ?? null;
    this.model = model?.trim() ?? null;
    this.screenSize = this.getScreenSize();
    this.isMobile = this.getIsMobile();
  }

  private getScreenSize() {
    if (!window) return null;

    return new ScreenSize(window.screen);
  }

  private getIsMobile() {
    return MOBILE_KEYWORDS.some((keyword) => this.userAgent.toLocaleLowerCase().includes(keyword));
  }
}

class ScreenSize {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;

  constructor(readonly screen: Screen) {
    this.width = screen.width;
    this.height = screen.height;
    this.availWidth = screen.availWidth;
    this.availHeight = screen.availHeight;
  }
}

export const deviceInfo = new DeviceInfo(navigator.userAgent);
