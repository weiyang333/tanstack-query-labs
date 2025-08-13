import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"


export const metadata: Metadata = {
  title: "React Query 示例",
  description: "useQuery 使用案例演示",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
