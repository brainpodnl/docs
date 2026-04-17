import lume from "lume/mod.ts";
import wiki from "wiki/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import metas from "lume/plugins/metas.ts";
import sitemap from "lume/plugins/sitemap.ts";
import robots from "lume/plugins/robots.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
  location: new URL("https://docs.brainpod.io"),
});

site.use(wiki());
site.use(tailwindcss());
site.use(metas());
site.use(sitemap());
site.use(robots({
  rules: [
    {
      userAgent: "*",
      allow: "/",
    },
  ],
}));

export default site;
