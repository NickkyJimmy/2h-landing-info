import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chương trình Customer 2H",
  description: "Để tầm nhìn của Manager chạm đến tim users. Tương tác với Users ít nhất 2 giờ mỗi tháng.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
