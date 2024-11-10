import localFont from "next/font/local";
import "./globals.css";

const apercuMed = localFont({
  src: "./fonts/Apercu Pro Medium.woff",
  variable: "--font-apercu-med",
  weight: "100 900",
});

export const metadata = {
  title: "the Orange Opinion",
  description: "it's the Orange Opinion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="Assets/logo_icon.png" />
      </head>
      <body
        //className={`${apercuMed.variable} antialiased`}
        className="font-apercuMed"
      >
        {children}
      </body>
    </html>
  );
}
