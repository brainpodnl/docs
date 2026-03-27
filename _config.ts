import lume from "lume/mod.ts";
import wiki from "wiki/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
});

site.use(wiki());
site.use(tailwindcss());

export default site;
