import "./globals.css";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getCurrentUser } from "@/.lib/session";
import { SessionProvider } from "@/components/providers/sessionProvider"; // 👈 Import our new provider
import NavBar from "@/components/shared-layout/navbar";
import Footer from "@/components/shared-layout/footer";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata = {
  title: "TechHub",
  description: "Your one stop tech store site",
};

export default async function RootLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <ThemeProvider>
          <Toaster richColors />
          <SessionProvider user={user}>
            <div>{modals}</div>

            <NavBar />
            <div className="min-h-screen flex flex-col">
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
