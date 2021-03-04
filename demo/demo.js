import { MultiViewSync } from "../index";

document.addEventListener("DOMContentLoaded", () => {
  const multiViewSync = new MultiViewSync();
  multiViewSync.setMaster(document.querySelector("video#master"));
  const minions = document.querySelectorAll("video.minion");
  Array.from(minions).forEach((minion) => {
    multiViewSync.addMinion({
      videoElement: minion,
      identifier: minion.id,
    });
  });
});
