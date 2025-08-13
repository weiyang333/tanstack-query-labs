import { NextResponse } from "next/server"

// 模拟用户数据
const users = [
  { id: 1, name: "张三", email: "zhangsan@example.com", age: 25 },
  { id: 2, name: "李四", email: "lisi@example.com", age: 30 },
  { id: 3, name: "王五", email: "wangwu@example.com", age: 28 },
  { id: 4, name: "赵六", email: "zhaoliu@example.com", age: 32 },
  { id: 5, name: "钱七", email: "qianqi@example.com", age: 27 },
]

export async function GET() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // 模拟随机错误（10%概率）
  if (Math.random() < 0.1) {
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }

  return NextResponse.json(users)
}
