"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface User {
  id: number
  name: string
  email: string
  age: number
}

// 获取用户列表的函数
const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users")
  if (!response.ok) {
    throw new Error("获取用户列表失败")
  }
  return response.json()
}

export default function UserList() {
  const {
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })


  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">用户列表</h2>
          <Badge variant="secondary">{users?.length || 0} 个用户</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                {/* User icon component */}
                <span className="h-5 w-5 text-muted-foreground">👤</span>
                <CardTitle className="text-lg">{user.name}</CardTitle>
              </div>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">年龄: {user.age}岁</p>
                <Badge variant="outline">ID: {user.id}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
