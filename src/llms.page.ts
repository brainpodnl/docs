const SITE_URL = "https://docs.brainpod.io";
const EXCLUDED_FILES = new Set(["404.md"]);

interface Document {
  description: string;
  order: number;
  path: string;
  source: string;
  title: string;
  url: string;
}

const sectionOrder = [
  "Start here",
  "Core concepts",
  "Resources",
  "Platform guides",
  "Blueprints",
  "Background",
];

export default async function* () {
  const documents = await loadDocuments();

  yield {
    url: "/llms.txt",
    layout: null,
    content: renderIndex(documents),
  };

  yield {
    url: "/llms-full.txt",
    layout: null,
    content: renderFullDocumentation(documents),
  };
}

async function loadDocuments(): Promise<Document[]> {
  const root = new URL("./", import.meta.url);
  const paths: string[] = [];
  await collectMarkdownFiles(root, "", paths);

  const documents = await Promise.all(paths.map(async (path) => {
    const source = await Deno.readTextFile(new URL(path, root));
    const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
    const title = source.match(/^title:\s*["'](.+)["']\s*$/m)?.[1] ??
      content.match(/^#\s+(.+)$/m)?.[1]?.trim() ??
      content.match(/<h1>(.+)<\/h1>/)?.[1]?.trim() ?? path;
    const description = source.match(
      /^\s{2}description:\s*["'](.+)["']\s*$/m,
    )?.[1] ?? firstParagraph(content);
    const order = Number(source.match(/^order:\s*(\d+)\s*$/m)?.[1] ?? 50);
    const url = path === "index.md"
      ? `${SITE_URL}/`
      : `${SITE_URL}/${path.replace(/\.md$/, "/")}`;

    return { description, order, path, source: content.trim(), title, url };
  }));

  return documents.sort((left, right) => {
    const sectionDifference = sectionOrder.indexOf(sectionFor(left.path)) -
      sectionOrder.indexOf(sectionFor(right.path));
    return sectionDifference || left.order - right.order ||
      left.title.localeCompare(right.title);
  });
}

async function collectMarkdownFiles(
  directory: URL,
  relativePath: string,
  paths: string[],
): Promise<void> {
  for await (const entry of Deno.readDir(directory)) {
    const path = relativePath ? `${relativePath}/${entry.name}` : entry.name;
    if (entry.isDirectory) {
      await collectMarkdownFiles(
        new URL(`${entry.name}/`, directory),
        path,
        paths,
      );
    } else if (entry.name.endsWith(".md") && !EXCLUDED_FILES.has(path)) {
      paths.push(path);
    }
  }
}

function renderIndex(documents: Document[]): string {
  const sections = sectionOrder.map((section) => {
    const links = documents
      .filter((document) => sectionFor(document.path) === section)
      .map((document) =>
        `- [${document.title}](${document.url}): ${document.description}`
      )
      .join("\n");

    return links ? `## ${section}\n\n${links}` : "";
  }).filter(Boolean);

  return `# Brainpod Documentation

> Official documentation for Brainpod, a European application platform for deploying and operating containerized workloads.

Brainpod provides managed application resources, networking, data services, image builds, and an OCI registry on European infrastructure. Start with the deployment guide, then use the resource and platform guides as implementation references.

${sections.join("\n\n")}

## Complete documentation

- [Full documentation corpus](${SITE_URL}/llms-full.txt): All Brainpod documentation combined into one Markdown-formatted text file.
`;
}

function renderFullDocumentation(documents: Document[]): string {
  const content = documents.filter((document) => document.path !== "index.md")
    .map((document) => {
      const source = rewriteRelativeLinks(document.source, document.path);
      return `# ${document.title}\n\nSource: ${document.url}\n\n${
        source.replace(/^#\s+.+\r?\n/, "").trim()
      }`;
    }).join("\n\n---\n\n");

  return `# Brainpod Documentation\n\n> Complete official Brainpod documentation, generated from the documentation source.\n\n${content}\n`;
}

function rewriteRelativeLinks(markdown: string, sourcePath: string): string {
  const sourceDirectory = sourcePath.includes("/")
    ? sourcePath.slice(0, sourcePath.lastIndexOf("/") + 1)
    : "";
  const base = new URL(sourceDirectory, `${SITE_URL}/`);

  return markdown.replace(
    /\]\(([^\s)]+)([^)]*)\)/g,
    (match, target, suffix) => {
      if (/^(?:[a-z]+:|#)/i.test(target)) {
        return match;
      }

      const resolved = new URL(target, base);
      if (resolved.pathname.endsWith(".md")) {
        resolved.pathname = `${resolved.pathname.slice(0, -3)}/`;
      }
      return `](${resolved.toString()}${suffix})`;
    },
  );
}

function firstParagraph(markdown: string): string {
  return markdown
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.replace(/^#+\s+/, "").trim())
    .find((paragraph) => paragraph && !paragraph.startsWith("#")) ?? "";
}

function sectionFor(path: string): string {
  if (
    path === "index.md" || path === "getting-started.md" ||
    path === "onboarding.md"
  ) {
    return "Start here";
  }
  if (path === "brainpod.md" || path === "resources.md") {
    return "Core concepts";
  }
  if (path.startsWith("resources/")) {
    return "Resources";
  }
  if (path.startsWith("blueprints")) {
    return "Blueprints";
  }
  if (path === "background-information.md") {
    return "Background";
  }
  return "Platform guides";
}
