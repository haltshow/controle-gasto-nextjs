import {login} from "@/lib/api/actions"
import { redirect } from 'next/navigation'

export default function Login() {

    async function handleSubmit(data : FormData) {
        'use server';

        await login(data)
    }

    let form : any = {}
    return (
        <main className="pt-8">
            <p className="text-[32px] text-center mb-8">
                Login
            </p>

            <form action={handleSubmit} method="POST">
                <label className="block mb-4 text-[16px]">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700">
                        Username
                    </span>
                    <input type="text" name="username" id="username" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                        placeholder="Insira um Username para realizar Login" />
                </label>

                <label className="block mb-4 text-[16px]">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700">
                        Senha
                    </span>
                    <input type="text" name="password" id="password" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                        placeholder="Insira a sua Senha" />
                </label>

                {form?.invalid && (
                    <p className="text-red-500"> {form?.mensagem} </p>
                )}

                {form?.credentials && (
                    <p className="text-red-500"> {form?.mensagem} </p>
                )}

                <button type="submit" className="bg-blue-500 text-sky-50 rounded-sm p-2">
                    Login
                </button>
            </form>
        </main>
    )
}