import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

const name = "野生";
export const siteTitle = `${name}\'s little world`;

export default function Layout({ children, home, postsData = [] }) {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Grid container spacing={1}>
        <Grid item xs={0} sm={4}>
          <Box className={styles.middleWrap}>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </Box>
          <Box className={styles.middleWrap}>
            <MenuList>
              {
                postsData.map(({ id, title }) => {
                  return (<MenuItem><Link href={`/${id.join('/')}`}>{title}</Link></MenuItem>);
                })
              }
            </MenuList>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box>
            <main>{children}</main>
            {!home && (
              <div className={styles.backToHome}>
                <Link href="/">← Back to home</Link>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
