import Head from "next/head";
import "./global.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className="bg-white dark:bg-stone-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
