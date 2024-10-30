import { defineConfig } from "tinacms";
import defaultMdxComponents from "fumadocs-ui/mdx";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: "docs",
        label: "Docs",
        path: "content/docs",
        format: "mdx",
        ui: {
          router({ document }) {
            console.log(document);

            if (document._sys.filename === "index") {
              return "/docs";
            }

            return `/docs/${document._sys.filename}`;
          },
        },
        fields: [
          {
            name: "fileName",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            templates: [
              {
                name: "CardsList",
                label: "Multiple Cards",
                fields: [
                  {
                    type: "object",
                    name: "Cards",
                    label: "Content",
                    list: true,
                    required: true,
                    fields: [
                      {
                        type: "string",
                        name: "Card",
                        label: "Title",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "href",
                        label: "Link",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
