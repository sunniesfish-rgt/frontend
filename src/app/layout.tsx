import type { Metadata } from "next";
import QueryProvider from "@/config/react-query-provider";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "RGT 도서관리 시스템",
  description: "RGT 도서관리 시스템",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
