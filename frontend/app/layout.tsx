import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import AuthProviderLoader from "../routes/AuthProviderLoader";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaqTec App",
  description: "Frontend de MaqTec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <AuthProviderLoader>

            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
              </div>
            </div>

          </AuthProviderLoader>
        </Providers>
      </body>
    </html>
  );
}
