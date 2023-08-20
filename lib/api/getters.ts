import { getUserCookies } from "@/utils/cookies";
import { prisma } from "../server/prisma";
import { redirect } from "next/navigation";

export async function getEntradas() {
    const user : any = getUserCookies('user');

    if (!user) {
        redirect('/login')
    }
      
    const entradas = await prisma.entrada.findMany({
        include: {
            origem: true,
        },
        where: {
            idUser: user?.id
        }
    });

    if (!entradas) {
        return null
    }

    return entradas
}

export async function getOrigemEntrada() {
    const user : any = getUserCookies('user');

    if (!user) {
        redirect('/login')
    }

    const origemEntrada = await prisma.origemEntrada.findMany({
        where: {
            idUser: user?.id
        }
    })
    
    if (!origemEntrada) {
        return null
    }

    return origemEntrada
}

export async function getEntradaById(id: number) {
    const entrada : any = await prisma.entrada.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            valor: true,
            origem: true,
        }
    });

    if (!entrada) {
        return null
    }

    return entrada
}

export async function getOrigemEntradaById(id: number) {
    const entrada : any = await prisma.origemEntrada.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!entrada) {
        return null
    }

    return entrada
}

export async function getOrigemSaida() {
    const user : any = getUserCookies('user');

    if (!user) {
        redirect('/login')
    }

    const origemSaida = await prisma.origemSaida.findMany({
        where: {
            idUser: user?.id
        }
    })
    
    if (!origemSaida) {
        return null
    }

    return origemSaida
}

export async function getOrigemSaidaById(id: number) {
    const entrada : any = await prisma.origemSaida.findUnique({
        where: {
            id: Number(id),
        },
    });

    if (!entrada) {
        return null
    }

    return entrada
}

export async function getSaidas() {
    const user : any = getUserCookies('user');

    if (!user) {
        redirect('/login')
    }
      
    const saidas = await prisma.saida.findMany({
        include: {
            origem: true,
        },
        where: {
            idUser: user?.id
        }
    });

    if (!saidas) {
        return null
    }

    return saidas
}

export async function getSaidaById(id: number) {
    const saida : any = await prisma.saida.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            valor: true,
            origem: true,
        }
    });

    if (!saida) {
        return null
    }

    return saida
}