export enum HTMLVideoElementEvents {
  ERROR = "error",
  LOADEDMETADATA = "loadedmetadata",
  LOADSTART = "loadstart",
  LOADEDDATA = "loadeddata",
  CANPLAY = "canplay",
  CANPLAYTHROUGH = "canplaythrough",
  PLAY = "play",
  PLAYING = "playing",
  PAUSE = "pause",
  ENDED = "ended",
  TIMEUPDATE = "timeupdate",
  RATECHANGE = "ratechange",
  VOLUMECHANGE = "volumechange",
  SEEKED = "seeked",
  SEEKING = "seeking",
  STALLED = "stalled",
  WAITING = "waiting",
}

export interface Slave {
  videoElement: HTMLVideoElement;
  identifier?: string;
}

export interface PingEvent {
  event: HTMLVideoElementEvents;
  time: number;
}

export const DIFF_BEHIND = 0.3;
export const DIFF_IN_FRONT = 0.3;
export const SPEED_UP = 1.05;
export const SLOW_DOWN = 0.95;
