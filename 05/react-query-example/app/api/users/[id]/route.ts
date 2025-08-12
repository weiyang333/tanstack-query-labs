import { NextResponse } from "next/server"

const users = [
  { id: 1, name: "张三", email: "zhangsan@example.com", age: 25, bio: "前端开发工程师，热爱技术" },
  { id: 2, name: "李四", email: "lisi@example.com", age: 30, bio: "后端开发工程师，专注于系统架构" },
  { id: 3, name: "王五", email: "wangwu@example.com", age: 28, bio: "全栈开发工程师，喜欢挑战" },
  { id: 4, name: "赵六", email: "zhaoliu@example.com", age: 32, bio: "产品经理，关注用户体验" },
  { id: 5, name: "钱七", email: "qianqi@example.com", age: 27, bio: "UI/UX设计师，追求完美" },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = users.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 })
  }

  return NextResponse.json(user)
}
