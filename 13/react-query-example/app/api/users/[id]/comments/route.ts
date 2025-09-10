// app/api/users/[id]/comments/route.ts
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const userId = parseInt(params.id)

        if (isNaN(userId)) {
            return NextResponse.json(
                { error: '无效的用户ID' },
                { status: 400 }
            )
        }

        // 模拟数据库评论数据
        const comments = [
            { id: 1, content: "这个产品非常好用！", date: "2023-10-15", userId },
            { id: 2, content: "我有一些建议想要分享...", date: "2023-10-10", userId },
            { id: 3, content: "客服回复很及时，感谢！", date: "2023-09-28", userId }
        ]

        return NextResponse.json(comments)
    } catch (error) {
        console.error('获取评论失败:', error)
        return NextResponse.json(
            { error: '获取评论失败' },
            { status: 500 }
        )
    }
}