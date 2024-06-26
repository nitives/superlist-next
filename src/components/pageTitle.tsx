import Head from "next/head";
import sitesData from "../../public/data/siteData.json";
const site = sitesData;

interface PageTitleProps {
  siteName?: string;
}

const PageTitle = ({ siteName }: PageTitleProps) => {
  return (
    <Head>
      <title>{`Superlist - ${siteName || "Site Not Found"}`}</title>
    </Head>
  );
};

export default PageTitle;
