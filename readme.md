MultiView Sync
===

A simple library to play multiple videos in sync, as long as their seekable time is the same.

This might for instance be used for playing multiple camera angles in sync.

The slaves will follow the master on these events as of the current implementation

- `Play`
- `Pause`
- `TimeUpdate`

The slaves will continuously try to be within 300 ms in front or behind the master. If a slave falls behind further, it will increase its playback rate with an unnoticable amount to try to get in sync. If it for some reason would get in front of the master, it will decrease its playback rate in the same manor.

## Installation

`npm install @eyevinn/multiview-sync`

## Usage

```js
import { MultiViewSync } from "@eyevinn/multiview-sync";

// Init the multiview sync library
const multiViewSync = new MultiViewSync();

// set you master video element, which will guide the slaves
multiViewSync.setMaster(document.querySelector("video#master"));

// get all the video elements that should follow the master
const slaves = document.querySelectorAll("video.slave");
// add each and every one of them as slaves
Array.from(slaves).forEach((slave) => {
  multiViewSync.addSlave({
    videoElement: slave,
    identifier: slave.id,
  });
});
```

