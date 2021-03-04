import { MultiViewSync } from "../index";

document.addEventListener("DOMContentLoaded", () => {
  const multiViewSync = new MultiViewSync();
  multiViewSync.setMaster(document.querySelector("video#master"));
  const slaves = document.querySelectorAll("video.slave");
  Array.from(slaves).forEach((slave) => {
    multiViewSync.addSlave({
      videoElement: slave,
      identifier: slave.id,
    });
  });
});
