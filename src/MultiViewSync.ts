import { DIFF_BEHIND, DIFF_IN_FRONT, HTMLVideoElementEvents, PingEvent, Slave, SLOW_DOWN, SPEED_UP } from "./utils/constants";

export class MultiViewSync {
  private master: HTMLVideoElement;
  private slaves: Slave[];

  private playListener: any;
  private pauseListener: any;
  private timeUpdateListener: any;

  constructor() {
    this.slaves = [];
  }

  setMaster(videoElement: HTMLVideoElement): void {
    this.master = videoElement;
    console.log("%cAdded master", "color:green;");
    this.master.addEventListener(HTMLVideoElementEvents.PLAY, this.playListener = () => {
      this.ping({
        event: HTMLVideoElementEvents.PLAY,
        time: this.master.currentTime
      });
    });
    this.master.addEventListener(HTMLVideoElementEvents.PAUSE, this.pauseListener = () => {
      this.ping({
        event: HTMLVideoElementEvents.PAUSE,
        time: this.master.currentTime
      });
    });
    this.master.addEventListener(HTMLVideoElementEvents.TIMEUPDATE, this.timeUpdateListener = () => {
      this.ping({
        event: HTMLVideoElementEvents.TIMEUPDATE,
        time: this.master.currentTime
      });
    });
  }

  addSlave({ videoElement, identifier }: Slave): void {
    if (this.slaves.find((slave) => slave.identifier === identifier)) {
      console.warn(`Slave with identifier ${identifier} already exists.`);
      return;
    }
    this.slaves.push({
      videoElement,
      ...(identifier && { identifier })
    });
    console.log(`%cAdded slave: %c${identifier}`, "color:orange;", "color:green;");
  }

  removeSlave(identifier: string): boolean {
    const slaveIndex = this.slaves.findIndex((s) => s.identifier === identifier);
    if (slaveIndex === -1) return false;
    this.slaves.splice(slaveIndex, 1);
    return true;
  }

  ping({ event, time }: PingEvent): void {
    console.log(`Ping event: %c${event}`, "color:blue;");
    switch (event) {
      case HTMLVideoElementEvents.PLAY:
        this.slaves.forEach((slave) => {
          slave.videoElement.currentTime = time;
          slave.videoElement.play();
        });
        break;
      case HTMLVideoElementEvents.PAUSE:
        this.slaves.forEach((slave) => {
          slave.videoElement.pause();
        });
        break;
      case HTMLVideoElementEvents.TIMEUPDATE:
        this.slaves.forEach((slave) => {
          this.sync({ slave, time });
        });
        break;
      default:
        break;
    }
  }

  sync({ slave, time }: { slave: Slave, time: number }): void {
    const masterTime = time;
    const slaveTime = slave.videoElement.currentTime;
    if (slaveTime < masterTime && masterTime - slaveTime > DIFF_BEHIND) {
      slave.videoElement.playbackRate = SPEED_UP;
    } else if (slaveTime > masterTime && slaveTime - masterTime > DIFF_IN_FRONT) {
      slave.videoElement.playbackRate = SLOW_DOWN;
    } else {
      slave.videoElement.playbackRate = 1.0;
    }
  }

  destroy() {
    this.slaves = [];
    this.master.removeEventListener(HTMLVideoElementEvents.PLAY, this.playListener);
    this.master.removeEventListener(HTMLVideoElementEvents.PAUSE, this.pauseListener);
    this.master.removeEventListener(HTMLVideoElementEvents.TIMEUPDATE, this.timeUpdateListener);
    this.master = null;
  }
}
