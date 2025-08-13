"use client"

import { useState } from "react"
import UserList from "@/components/user-list"
import UserDetail from "@/components/user-detail"
import { Card,CardContent } from "@/components/ui/card"

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  return (
    <main className="container mx-auto p-6 space-y-6">

      {selectedUserId ? (
        <UserDetail userId={selectedUserId} onBack={() => setSelectedUserId(null)} />
      ) : (
        <div className="space-y-4">
          <UserList />
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">点击任意用户卡片查看详情（演示条件查询）</p>
              <div className="grid gap-2 mt-4 md:grid-cols-3">
                {[1, 2, 3, 4, 5].map((id) => (
                  <button
                    key={id}
                    onClick={() => setSelectedUserId(id)}
                    className="p-2 text-sm border rounded hover:bg-muted transition-colors"
                  >
                    查看用户 {id} 详情
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
