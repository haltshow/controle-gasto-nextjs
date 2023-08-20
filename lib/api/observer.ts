import { getUserCookies } from "@/utils/cookies"
import { redirect } from "next/navigation"

export default function Observer() {
    const user = getUserCookies('user')
    if (!user) {
        redirect('/login')
    }
}