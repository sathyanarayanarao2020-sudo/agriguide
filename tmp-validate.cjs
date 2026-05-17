const fs = require("fs");
const path = require("path");
const data = JSON.parse(fs.readFileSync(path.resolve("public/cropData.json"), "utf8"));
(async () => {
  for (const crop of data) {
    const url = crop.image;
    if (!url) continue;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (!res.ok) {
        console.log(crop.title + ": " + res.status + " " + res.statusText + " -> " + url);
      } else {
        const ct = res.headers.get("content-type");
        if (!ct || !ct.startsWith("image/")) {
          console.log(crop.title + ": content-type=" + ct + " -> " + url);
        }
      }
    } catch (e) {
      console.log(crop.title + ": ERROR " + e.message + " -> " + url);
    }
  }
})();
