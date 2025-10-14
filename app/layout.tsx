import "./globals.css";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NavBar from "@/components/shared-layout/navbar";
import Footer from "@/components/shared-layout/footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  title: "TechHub",
  description: "Your one stop tech store site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
