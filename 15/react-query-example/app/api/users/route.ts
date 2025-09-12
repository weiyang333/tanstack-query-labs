import { NextResponse } from "next/server"
import { resolve } from "path"

// 模拟用户数据
const users = [
  { id: 1, name: "张三", email: "zhangsan@example.com", age: 25 },
  { id: 2, name: "李四", email: "lisi@example.com", age: 30 },
  { id: 3, name: "王五", email: "wangwu@example.com", age: 28 },
  { id: 4, name: "赵六", email: "zhaoliu@example.com", age: 32 },
  { id: 5, name: "钱七", email: "qianqi@example.com", age: 27 },
]

// 模拟用户数据
const allUsers = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `用户${index + 1}`,
  email: `user${index + 1}@example.com`,
  age: Math.floor(Math.random() * 100) + 1
}))

// export async function GET() {
//   // 模拟网络延迟
//   await new Promise((resolve) => setTimeout(resolve, 1000))

//   // 模拟随机错误（10%概率）
//   if (Math.random() < 0.1) {
//     return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
//   }

//   return NextResponse.json(users)
// }

export async function GET(request: Request) {
  try {
    // 获取url中的搜索参数
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get('q') || ''

    // // 如果没有搜索词，返回所有的用户
    // if (!searchTerm) {
    //   return NextResponse.json(users)
    // }
    // // 服务端搜索逻辑
    // const term = searchTerm.toLowerCase()
    // const filteredUsers = users.filter(user =>
    //   user.name.toLowerCase().includes(term) ||
    //   user.email.toLowerCase().includes(term) ||
    //   user.id.toString().includes(term) ||
    //   user.age.toString().includes(term)
    // )
    // return NextResponse.json(filteredUsers)

    // 获取分页参数
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    // 延迟模拟网络请求
    await new Promise((resolve) => setTimeout(resolve, 500))

    // 根据搜索词筛选用户
    let filteredUsers = searchTerm ? allUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm) ||
      user.age.toString().includes(searchTerm)
    )
      : allUsers

    // 计算分页的数据
    const totalItems = filteredUsers.length
    const totalPages = Math.ceil(totalItems / pageSize)

    // 获取当前页数据
    const startIndex = (page - 1) * pageSize
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize)

    // 返回分页数据和分页信息
    return NextResponse.json({
      data: paginatedUsers,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages
      }

    })


  } catch (error) {
    console.log('搜索用户失败：', error);
    return NextResponse.json(
      { error: '搜索用户失败' },
      { status: 500 }
    )
  }
}
