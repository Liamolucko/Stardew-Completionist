const ghpages = require("gh-pages");

ghpages.publish("__sapper__/export", {
  branch: "gh-pages"
});
