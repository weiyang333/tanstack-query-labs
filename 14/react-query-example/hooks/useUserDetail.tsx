import { useQuery, queryOptions } from "@tanstack/react-query";
interface UserDetail {
    id: number
    name: string
    email: string
    age: number
    bio: string
}

export function groupOption(userId: number | undefined) {
    return queryOptions({
        queryKey: ["user", userId],
        queryFn: () => fetchUserDetail(userId as number),
        enabled: !!userId, // 只有当 userId 存在时才执行查询
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000
    })
}

// 获取用户详情的函数
const fetchUserDetail = async (id: number): Promise<UserDetail> => {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
        throw new Error("获取用户详情失败")
    }
    return response.json()
}

export function useUserDetail(userId: number | undefined) {
    return useQuery(groupOption(userId))

}