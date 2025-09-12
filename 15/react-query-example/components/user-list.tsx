"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import axios from 'axios'
import ky from 'ky'
import { useState } from "react"
import { Input, Pagination } from "antd"
import { useDebounce } from "@/hooks/useDebounce"

interface User {
  id: number
  name: string
  email: string
  age: number
}

interface PaginatedResponse {
  data: User[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
  }
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
// const fetchUsers = async (): Promise<User[]> => {
//   const response = await ky.get("/api/users")
//   return response.json()
// }

// 获取用户列表
// const fetchUsers = async (searchTerm: string): Promise<User[]> => {
//   const url = searchTerm ? `/api/users?q=${encodeURIComponent(searchTerm)}` : "/api/users"
//   const response = await ky.get(url)
//   return response.json()
// }

const fetchUsers = async (searchTerm: string, page: number, pageSize: number): Promise<PaginatedResponse> => {
  let url = `/api/users?page=${page}&pageSize=${pageSize}`
  if (searchTerm) {
    url += `&q=${encodeURIComponent(searchTerm)}`
  }
  const response = await ky.get(url)
  return response.json()

}

export default function UserList() {
  // 搜索关键词状态
  const [searchTerm, setSearchTerm] = useState("")

  // 分页状态
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 使用防抖来减少请求的频率
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const {
    data,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["users", debouncedSearchTerm, page, pageSize],
    queryFn: () => fetchUsers(debouncedSearchTerm, page, pageSize),
    placeholderData: (previousData) => previousData // 保持上一次的数据，避免加载状态闪烁
  })

  // // 在客户端对数据进行过滤
  // const filterUsers = users?.filter(user => {
  //   if (!searchTerm) return true
  //   const term = searchTerm.toLowerCase()
  //   return (
  //     user.name.toLowerCase().includes(term) ||
  //     user.email.toLowerCase().includes(term) ||
  //     user.id.toString().includes(term) ||
  //     user.age.toString().includes(term)
  //   )
  // })

  const users = data?.data || []
  const pagination = data?.pagination

  // 处理分页变化
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  // 处理每页条数变化
  const handlePageSizeChange = (current: number, size: number) => {
    setPage(1)  //重置到第一页
    setPageSize(size)
  }


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
          <Badge variant="secondary">{pagination?.totalItems || 0} 个用户</Badge>
        </div>
      </div>
      {isLoading ? (
        <div className="py-8 text-center">搜索中</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users?.length > 0 ? (
            users.map((user) => (
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
            ))

          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              没有找到匹配的用户
            </div>

          )}


        </div>

      )}

      {/* 分页的控件 */}
      {pagination && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.totalItems}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共${total}条记录`}
            disabled={isFetching}
          />
        </div>
      )}
    </div>
  )
}
