import { cookies } from 'next/headers'

export function getUserCookies(name : string) {
    const cookieStore = cookies()

    const cookie = cookieStore.get(name)!

    const cookieValue = cookie?.value ?? ''

    const cookieJson = cookieValue ? JSON.parse(cookieValue) : null

    return cookieJson
}