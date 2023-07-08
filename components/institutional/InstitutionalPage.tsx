import { Head } from "$fresh/runtime.ts";
import { Section } from "$live/blocks/section.ts";

export interface Props {
  title: string;
  asideMenu: Section;
  content: Section;
}

function InstitutionalPage({
  asideMenu: { Component: AsideComponent, props: asideProps },
  content: { Component: ContentComponent, props: contentProps },
  title,
}: Props) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .markdown-body h2 {
              font-size: 18px;
              font-weight: 700;
              line-height: 1.4;
              margin: 0 0 20px 0;
              text-transform: uppercase;
            }
            .markdown-body h3 {
              font-size: 18px;
              font-weight: 700;
              line-height: 1.4;
              margin: 0 0 20px 0;
            }
            .markdown-body p:empty {
              display: none;
            }
            .markdown-body p:last-child {
              margin-bottom: 20px;
            }
            .markdown-body p {
              color: #8E8E9F;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
            }
            .markdown-body ul {
              margin-left: 2rem;
              padding-left: 2rem;
            }
            .markdown-body li {
              list-style-type: disc;
            }

            @media screen and (min-width: 992px) {
              .markdown-body h2 {
                font-size: 20px;
              }
            }
          `,
          }}
        />
      </Head>
      <div>
        {/* Banner Institucional | Suporte */}
      </div>
      <div class="flex flex-col md:flex-row justify-between mt-[15px]">
        <AsideComponent {...asideProps} />
        <article class="md:pl-[30px] w-full">
          <h3 class="hidden text-secondary text-[28px] font-medium leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px] md:block">
            {title}
          </h3>
          <ContentComponent {...contentProps} />
        </article>
      </div>
    </>
  );
}

export default InstitutionalPage;
