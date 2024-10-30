"use client";
import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { DocsQuery, Exact, Scalars } from "@/tina/__generated__/types";
import { Pre, CodeBlock } from "fumadocs-ui/components/codeblock";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import github from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeWithShiki } from "@/components/shiki";
import { useShiki } from "fumadocs-core/utils/use-shiki";

interface ClientDocPageProps {
  data: DocsQuery;
  errors?:
    | {
        message: string;
        locations: {
          line: number;
          column: number;
        }[];
        path: string[];
      }[]
    | undefined;
  variables: Exact<{
    relativePath: Scalars["String"]["input"];
  }>;
  query: string;
}

function ClientDocPage(props: ClientDocPageProps) {
  const { data } = useTina<DocsQuery>(props);

  console.log(data);

  return (
    <div>
      <div data-tina-field={tinaField(data.docs, "body")}>
        <TinaMarkdown
          content={data.docs.body}
          components={{
            code_block(props) {
              if (props) {
                const out = useShiki(props.value, {
                  lang: props.lang || "plaintext",
                });
                return (
                  <CodeBlock keepBackground {...props}>
                    <Pre>{out}</Pre>
                  </CodeBlock>
                );
              }
              return <></>;
            },
            CardsList: (props: any) => {
              console.log(props);
              return (
                <div data-tina-field={tinaField(data?.docs.CardsList)}>
                  <defaultMdxComponents.Cards>
                    {props.Cards.map(
                      ({ title }: { title: string }, index: number) => (
                        <defaultMdxComponents.Card title={title} key={index} />
                      )
                    )}
                  </defaultMdxComponents.Cards>
                </div>
              );
              // <defaultMdxComponents.Cards>
              //   {props.cards.map((card: any) => (
              //     <defaultMdxComponents.Card
              //       title={card.title}
              //       href={card.href}
              //     />
              //   ))}
              // </defaultMdxComponents.Cards>;
            },
          }}
        />
      </div>
    </div>
  );
}

export default ClientDocPage;
