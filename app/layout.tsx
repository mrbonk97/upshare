import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/react-query/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
import { Suspense } from "react";
import LoadingPage from "./loading/page";
import { Toaster } from "@/components/ui/toaster";

const inter = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "파일 공유",
  description: "간편하게 파일을 공유해보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<LoadingPage />}>
              <Toaster />
              {children}
            </Suspense>
            <ModeToggle />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
