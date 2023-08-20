"use server"

import prisma from '../server/prisma'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getUserCookies } from '@/utils/cookies';
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function login(data: FormData) {
    'use server';

    const username: any = data.get('username')
    const password: any = data.get('password')
   
   
    if (!username || !password || username == '' || password == '') {
        return NextResponse.json({mensagem: 'Preencha todas as informações'}, {status: 400})
    }

    const user = await prisma.user.findUnique({ where: { username }})

    if (!user) {
        return NextResponse.json({mensagem: 'Usuario não foi cadastrado anteriormente.'}, {status: 400})
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)

    if (!userPassword) {
        return NextResponse.json({mensagem: 'Credenciais erradas!'}, {status: 400})
    }

    const authenticatedUser = await prisma.user.update({
        where: { username: user.username },
        data: { 
            userAuthToken: crypto.randomUUID() 
        }
    })
    const userStorage = {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        username: authenticatedUser.username
    }
    
    cookies().set({
        name: 'user',
        value: JSON.stringify(userStorage),
        httpOnly: true,
        path: '/',
    });

    redirect('/')
}

export async function logout() {
    cookies().delete('user')
}

export async function createEntrada(data: FormData) {
    const user : any = getUserCookies('user');
    const origem: any = data.get('origem')
    const valor: any = data.get('valor')

    try {
        await prisma.entrada.create({
            data: {
                idOrigem: Number(origem),
                valor: Number(valor),
                idUser: user?.id
            }
        })
    } catch(err) {
        console.log(err)
    }

    redirect('/entrada')
}

export async function editEntrada(data: FormData) {
    const id : any = data.get('id')
    const origem: any = data.get('origem')
    const valor: any = data.get('valor')

    try {
        await prisma.entrada.update({
            where: {
                id: Number(id)
            },
            data: {
                idOrigem: Number(origem),
                valor: Number(valor)
            }
        })
    } catch(err) {
        console.log(err)
    }

    redirect('/entrada')
}

export async function deleteEntrada(data: FormData) {
    const id: any = data.get('id')

    try {
        await prisma.entrada.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (err) {
        console.log(err)
    }

    revalidateTag('entradas')
}

export async function createOrigemEntrada(data: FormData) {
    const user : any = getUserCookies('user');
    const nome: any = data.get('nome')

    if (nome == '') {
        return { success: false, message: "Preencha todos os campos antes de salvar."}
    }

    try {
        await prisma.origemEntrada.create({
            data: {
                nome,
                idUser: user?.id
            }
        })
    } catch(err) {
        console.log(err)

    }

    redirect('/origem/entrada')
}

export async function editOrigemEntrada(data: FormData) {
    const id : any = data.get('id')
    const origem: any = data.get('origem')

    try {
        await prisma.origemEntrada.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: origem,
            }
        })
    } catch(err) {
        console.log(err)
    }

    redirect('/origem/entrada')
}

export async function deleteOrigemEntrada(data: FormData) {
    const id: any = data.get('id')
    try {
        await prisma.origemEntrada.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (err) {
        console.log(err)
    }

    revalidatePath('/origem/entrada')
}

export async function createOrigemSaida(data: FormData) {
    const user : any = getUserCookies('user');
    const nome: any = data.get('nome')

    if (nome == '') {
        return { success: false, message: "Preencha todos os campos antes de salvar."}
    }

    try {
        await prisma.origemSaida.create({
            data: {
                nome,
                idUser: user?.id
            }
        })
    } catch(err) {
        console.log(err)

    }

    redirect('/origem/saida')
}

export async function editOrigemSaida(data: FormData) {
    const id : any = data.get('id')
    const origem: any = data.get('origem')

    try {
        await prisma.origemSaida.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: origem,
            }
        })
    } catch(err) {
        console.log(err)
    }

    redirect('/origem/saida')
}

export async function deleteOrigemSaida(data: FormData) {
    const id: any = data.get('id')
    try {
        await prisma.origemSaida.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (err) {
        console.log(err)
    }

    revalidateTag('origens')
}

export async function createSaida(data: FormData) {
    const user : any = getUserCookies('user');
    const origem: any = data.get('origem')
    const valor: any = data.get('valor')

    try {
        await prisma.saida.create({
            data: {
                idOrigem: Number(origem),
                valor: Number(valor),
                idUser: user?.id
            }
        })
    } catch(err) {
        console.log(err)
    }

    redirect('/saida')
}

export async function editSaida(data: FormData) {
    const id : any = data.get('id')
    const origem: any = data.get('origem')
    const valor: any = data.get('valor')

    try {
        await prisma.saida.update({
            where: {
                id: Number(id)
            },
            data: {
                idOrigem: Number(origem),
                valor: Number(valor)
            }
        })
    } catch(err) {
        console.log(err)
    }

    redirect('/saida')
}

export async function deleteSaida(data: FormData) {
    const id: any = data.get('id')

    try {
        await prisma.saida.delete({
            where: {
                id: Number(id)
            }
        })
    } catch (err) {
        console.log(err)
    }

    revalidateTag('saidas')
}