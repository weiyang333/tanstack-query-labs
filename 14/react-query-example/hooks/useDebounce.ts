import {useState,useEffect} from 'react'


export function useDebounce<T>(value:T,delay:number): T {
    const [debouncedValue,setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        // 设置定时器
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        },delay)
        return () => {
            clearTimeout(timer)
        }

    },[value,delay])

    return debouncedValue

}