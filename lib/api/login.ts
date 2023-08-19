import { redirect } from 'next/navigation'
import prisma from '../server/prisma'
import bcrypt from 'bcrypt'
import Cookies from 'cookies'

export default async function handler(req : any , res : any) {
    const cookies = new Cookies(req, res)

    const body = req.body
    const username = body.username
    const password = body.password
   
   
    if (!username || !password) {
        return res.status(400).json({ data: 'First or last name not found' })
    }

    const user = await prisma.user.findUnique({ where: { username }})

    if (!user) {
        return res.status(400).json({ mensagem: "Credenciais erradas!", credentials: true })
    }

    const userPassword = await bcrypt.compare(password, user.passwordHash)

    if (!userPassword) {
        return res.status(400).json({ mensagem: "Credenciais erradas!", credentials: true})
    }

    const authenticatedUser = await prisma.user.update({
        where: { username: user.username },
        data: { 
            userAuthToken: crypto.randomUUID() 
        }
    })

    cookies.set('session', authenticatedUser.userAuthToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
    })
   
    return res.status(200).json({ mensagem: "Sucesso!" })
  }