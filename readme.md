MultiView Sync
===

A simple library to play multiple videos in sync, as long as their seekable time is the same.

This might for instance be used for playing multiple camera angles in sync.

The minions will follow the master on these events as of the current implementation

- `Play`
- `Pause`
- `TimeUpdate`

The minions will continuously try to be within 300 ms in front or behind the master. If a minion falls behind further, it will increase its playback rate with an unnoticable amount to try to get in sync. If it for some reason would get in front of the master, it will decrease its playback rate in the same manor.

## Installation

`npm install @eyevinn/multiview-sync`

## Usage

```js
import { MultiViewSync } from "@eyevinn/multiview-sync";

// Init the multiview sync library
const multiViewSync = new MultiViewSync();

// set you master video element, which will guide the minions
multiViewSync.setMaster(document.querySelector("video#master"));

// get all the video elements that should follow the master
const minions = document.querySelectorAll("video.minion");
// add each and every one of them as minions
Array.from(minions).forEach((minion) => {
  multiViewSync.addMinion({
    videoElement: minion,
    identifier: minion.id,
  });
});
```

![Minions_characters](https://user-images.githubusercontent.com/624182/109943292-5328e780-7cd5-11eb-801d-0174aeeea879.png)

# Authors

This open source project is maintained by Eyevinn Technology.

## Contributors

- Erik Hoffman (erik.hoffman@eyevinn.se)

In addition to contributing code, you can help to triage issues. This can include reproducing bug reports, or asking for vital information such as version numbers or reproduction instructions.

# License (MIT)

Copyright 2021 Eyevinn Technology AB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# About Eyevinn Technology

Eyevinn Technology is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor.

At Eyevinn, every software developer consultant has a dedicated budget reserved for open source development and contribution to the open source community. This give us room for innovation, team building and personal competence development. And also gives us as a company a way to contribute back to the open source community.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!