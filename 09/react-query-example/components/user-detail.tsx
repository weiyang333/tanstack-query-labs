"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, AlertCircle, User, Mail, Calendar } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserDetailSkeleton } from "@/components/loading-skeleton"
import { groupOption, useUserDetail } from "@/hooks/useUserDetail"
import { useQuery } from "@tanstack/react-query"


interface UserDetailProps {
  userId: number
  onBack: () => void
}

// 用户状态指示器组件 - 共享相同的查询状态
function UserStatusIndicator({ userId }: { userId: number }) {
  // 使用相同的 queryOptions，共享查询状态
  const { data: user, isFetching } = useQuery(groupOption(userId))
  
  return (
    <div className="flex items-center gap-2 text-sm">
      {isFetching && <span className="animate-pulse">⟳</span>}
      <span>用户: {user?.name || '加载中...'}</span>
      <Badge variant="outline">{isFetching ? '刷新中' : '已加载'}</Badge>
    </div>
  )
}

export default function UserDetail({ userId, onBack }: UserDetailProps) {
  const {
    data: user,
    isPending,
    isFetching,
    isLoading,
    error,
  } = useQuery(groupOption(userId))

  if (isPending) {
    return <span>loading...</span>
  }

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
      <UserStatusIndicator userId={userId}/>

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
