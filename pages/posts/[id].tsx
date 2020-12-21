import Layout from "../../components/layout.tsx";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";

export  const getStaticProps:GetStaticProps = async({ params })=> {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
}
export const getStaticPaths:GetStaticPaths = async()=> {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData: { title, id, date, contentHtml } }) {
  return (
    <Layout>
      <Head>{title}</Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}
