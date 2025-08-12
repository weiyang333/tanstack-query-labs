"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertCircle, User, Mail, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserDetailSkeleton } from "@/components/loading-skeleton"

interface UserDetail {
  id: number
  name: string
  email: string
  age: number
  bio: string
}

interface UserDetailProps {
  userId: number
  onBack: () => void
}

// 获取用户详情的函数
const fetchUserDetail = async (id: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${id}`)
  if (!response.ok) {
    throw new Error("获取用户详情失败")
  }
  return response.json()
}

export default function UserDetail({ userId, onBack }: UserDetailProps) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserDetail(userId),
    enabled: !!userId, // 只有当 userId 存在时才执行查询
  })

  if (isLoading) {
    return <UserDetailSkeleton />
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回列表
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error instanceof Error ? error.message : "获取用户详情失败"}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        返回列表
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary">ID: {user.id}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-medium">年龄</h4>
              </div>
              <p className="text-muted-foreground pl-6">{user.age}岁</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">个人简介</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
