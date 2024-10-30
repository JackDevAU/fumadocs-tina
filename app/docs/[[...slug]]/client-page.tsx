"use client";
import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import defaultMdxComponents from "fumadocs-ui/mdx";

function ClientDocPage(props: any) {
  const { data } = useTina(props);

  console.log(data);

  return (
    <div>
      <div data-tina-field={tinaField(data.docs, "body")}>
        <TinaMarkdown
          content={data.docs.body}
          components={{
            CardsList: (props: any) => {
              console.log(props);
              return (
                <div data-tina-field={tinaField(data?.docs.CardsList)}>
                  <defaultMdxComponents.Cards>
                    {props.Cards.map(({ Card }: any, index: number) => (
                      <defaultMdxComponents.Card title={Card} key={index} />
                    ))}
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
