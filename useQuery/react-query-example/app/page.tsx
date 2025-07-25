"use client"

import { useState } from "react"
import UserList from "@/components/user-list"
import UserDetail from "@/components/user-detail"

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  return (
    <main className="container mx-auto p-6 space-y-6">

      {selectedUserId ? (
        <UserDetail userId={selectedUserId} onBack={() => setSelectedUserId(null)} />
      ) : (
        <div className="space-y-4">
          <UserList />
        </div>
      )}
    </main>
  )
}
