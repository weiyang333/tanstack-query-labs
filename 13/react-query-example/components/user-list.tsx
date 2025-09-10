"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import axios from 'axios'
import ky from 'ky'
import { useState } from "react"
import { Input } from "antd"

interface User {
  id: number
  name: string
  email: string
  age: number
}

// 获取用户列表的函数
//fetch
/* const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("/api/users")
  if (!response.ok) {
    throw new Error("获取用户列表失败")
  }
  return response.json()
} */

//ky
const fetchUsers = async (): Promise<User[]> => {
  const response = await ky.get("/api/users")
  return response.json()
}

export default function UserList() {
  // 搜索关键词状态
  const [searchTerm,setSearchTerm] = useState("")

  const {
    data: users,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  // 在客户端对数据进行过滤
  const filterUsers = users?.filter(user => {
    if(!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return(
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.id.toString().includes(term) ||
      user.age.toString().includes(term)
    )
  })


  return (
    <div className="space-y-4">
      {/* 搜索框 */}
      <div className="relative"> 
        <Input.Search
          placeholder="搜索用户"
          className="absolute"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">用户列表</h2>
          <Badge variant="secondary">{users?.length || 0} 个用户</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filterUsers?.map((user) => (
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

        {filterUsers?.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            没有找到匹配的用户
          </div>

        )}
      </div>
    </div>
  )
}
