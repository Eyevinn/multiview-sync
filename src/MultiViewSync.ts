import {
  DIFF_BEHIND,
  DIFF_IN_FRONT,
  HTMLVideoElementEvents,
  PingEvent,
  Minion,
  SLOW_DOWN,
  SPEED_UP,
} from "./utils/constants";

export class MultiViewSync {
  private master: HTMLVideoElement;
  private minions: Minion[];

  private playListener: any;
  private pauseListener: any;
  private timeUpdateListener: any;

  constructor() {
    this.minions = [];
  }

  public setMaster(videoElement: HTMLVideoElement): void {
    this.master = videoElement;
    console.log("%cAdded master", "color:green;");
    this.master.addEventListener(
      HTMLVideoElementEvents.PLAY,
      (this.playListener = () => {
        this.ping({
          event: HTMLVideoElementEvents.PLAY,
          time: this.master.currentTime,
        });
      })
    );
    this.master.addEventListener(
      HTMLVideoElementEvents.PAUSE,
      (this.pauseListener = () => {
        this.ping({
          event: HTMLVideoElementEvents.PAUSE,
          time: this.master.currentTime,
        });
      })
    );
    this.master.addEventListener(
      HTMLVideoElementEvents.TIMEUPDATE,
      (this.timeUpdateListener = () => {
        this.ping({
          event: HTMLVideoElementEvents.TIMEUPDATE,
          time: this.master.currentTime,
        });
      })
    );
  }

  public addMinion({ videoElement, identifier }: Minion): void {
    if (this.minions.find((minion) => minion.identifier === identifier)) {
      console.warn(`Minion with identifier ${identifier} already exists.`);
      return;
    }
    this.minions.push({
      videoElement,
      ...(identifier && { identifier }),
    });
    console.log(
      `%cAdded minion: %c${identifier}`,
      "color:orange;",
      "color:green;"
    );
  }

  public removeMinion(identifier: string): boolean {
    const minionIndex = this.minions.findIndex(
      (s) => s.identifier === identifier
    );
    if (minionIndex === -1) return false;
    this.minions.splice(minionIndex, 1);
    return true;
  }

  private ping({ event, time }: PingEvent): void {
    console.log(`Ping event: %c${event}`, "color:blue;");
    switch (event) {
      case HTMLVideoElementEvents.PLAY:
        this.minions.forEach((minion) => {
          minion.videoElement.currentTime = time;
          minion.videoElement.play();
        });
        break;
      case HTMLVideoElementEvents.PAUSE:
        this.minions.forEach((minion) => {
          minion.videoElement.pause();
        });
        break;
      case HTMLVideoElementEvents.TIMEUPDATE:
        this.minions.forEach((minion) => {
          this.sync({ minion: minion, time });
        });
        break;
      default:
        break;
    }
  }

  private sync({ minion, time }: { minion: Minion; time: number }): void {
    const masterTime = time;
    const minionTime = minion.videoElement.currentTime;
    if (minionTime < masterTime && masterTime - minionTime > DIFF_BEHIND) {
      minion.videoElement.playbackRate = SPEED_UP;
    } else if (
      minionTime > masterTime &&
      minionTime - masterTime > DIFF_IN_FRONT
    ) {
      minion.videoElement.playbackRate = SLOW_DOWN;
    } else {
      minion.videoElement.playbackRate = 1.0;
    }
  }

  public destroy() {
    this.minions = [];
    this.master.removeEventListener(
      HTMLVideoElementEvents.PLAY,
      this.playListener
    );
    this.master.removeEventListener(
      HTMLVideoElementEvents.PAUSE,
      this.pauseListener
    );
    this.master.removeEventListener(
      HTMLVideoElementEvents.TIMEUPDATE,
      this.timeUpdateListener
    );
    this.master = null;
  }
}
