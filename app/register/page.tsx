import prisma from '@/lib/server/prisma';
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation';

export default function Register() {
    let form : any = {}

    async function handleSubmit(data : FormData) {
        'use server';
        try {
            const name: any = data.get('name')
            const username: any = data.get('username')
            const password: any = data.get('password')

            if (name == '' || username == '' || password == '') {
                return null
            }

            const user = await prisma.user.findUnique({
                where: { username }
            });
        
            if (user) {
                return null
            }
        
            const userCreated = await prisma.user.create({
                data: {
                    username,
                    name,
                    passwordHash: await bcrypt.hash(password, 10),
                    userAuthToken: crypto.randomUUID()
                }
            })
            if (userCreated) {
                redirect('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <main>
            <section>
                <p className="text-[32px] text-center mb-2">
                    Cadastro
                </p>

                <p className="text-[16px] text-center mb-8 text-blue-500">
                    Para criar e controlar suas finanças é necessário criar uma conta!
                </p>

                <form action={handleSubmit} method="POST">
                    <label className="block mb-4 text-[16px]">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700">
                            Nome
                        </span>
                        <input type="text" name="name" id="name" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Insira o seu Nome" />
                    </label>

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

                    {form?.user && (
                        <p className="text-red-500"> {form?.mensagem} </p>
                    )}

                    <button type="submit" className="bg-blue-500 text-sky-50 rounded-sm p-2 hover:bg-blue-600 hover:duration-150">
                        Cadastrar
                    </button>
                </form>

                <p className="mt-2"> 
                    Já possui uma conta? 
                    <a href="/login" className="text-blue-500 decoration-none">Login</a>
                </p>
            </section>
        </main>
    )
}