import prisma from "@/lib/server/prisma";
import { getUserCookies } from "@/utils/cookies";

import { RiMoneyDollarCircleLine } from "react-icons/ri"
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"
import { redirect } from "next/navigation";

export default async function Page() {
  const user : any = getUserCookies('user');
  if (!user) {
    redirect('/login')
  }

  async function getEntradaTotal() {
    const ag = await prisma.entrada.aggregate({
        _sum: {valor: true}, 
        where: {
          idUser: user?.id
        }
    });
    return Number(ag._sum.valor);
  }

  async function getSaidaTotal() {
      const ag = await prisma.saida.aggregate({
          _sum: {valor: true},
          where: {
            idUser: user?.id
          }
      });
      return Number(ag._sum.valor);
  }

  async function sumEntradaGroupByOrigem() {
      let res = await prisma.entrada.groupBy({
          by: ['idOrigem'],
          _sum: {
              valor: true,
          },
          where: {
            idUser: user?.id
          }
      });

      const data = await Promise.all(res.map(async (r) => {
          const origem = await prisma.origemEntrada.findFirst({where: {id: Number(r.idOrigem)}});
          return {...r, origem: origem?.nome};
      }));

      return data;
  }

  async function sumSaidaGroupByOrigem() {
      let res = await prisma.saida.groupBy({
          by: ['idOrigem'],
          _sum: {
              valor: true,
          },
          where: {
            idUser: user?.id
          }
      });

      const data = await Promise.all(res.map(async (r) => {
          const origem = await prisma.origemSaida.findFirst({where: {id: Number(r.idOrigem)}});
          return {...r, origem: origem?.nome};
      }));

      return data;
  }

  const entrada = await getEntradaTotal()
  const saida = await getSaidaTotal()
  const entradasByOrigem = await sumEntradaGroupByOrigem()
  const saidasByOrigem = await sumSaidaGroupByOrigem()
  const total = entrada - saida;


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="text-[22px]">

        <h1 className="text-[32px] text-sky-500 mb-8">
          Sistema de Controle de Gastos
        </h1>

        <div className="flex flex-col gap-4">
          <div className="bg-sky-500 text-sky-50 rounded-sm p-2 flex justify-center items-center gap-2">
            <RiMoneyDollarCircleLine className="text-[28px]" />
            <p>
              Total: R$ {Number(total).toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="bg-green-500 text-sky-50 rounded-sm p-2 flex justify-center items-center gap-2">
            <AiFillPlusCircle className="text-[28px]" />
            <p>
              Entrada: R$ {Number(entrada).toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="bg-red-500 text-sky-50 rounded-sm p-2 flex justify-center items-center gap-2">
            <AiFillMinusCircle className="text-[28px]" />
            <p>
              Saída: R$ {Number(saida).toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[20px] mt-8 mb-4">
            Valor Total das Entradas por Origem
          </p>
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 shadow-md shadow-blue-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-[14px] font-semibold">
              <tr>
                <th scope="col" className="py-3 px-6 tracking-wider text-gray-700 uppercase dark:text-gray-400">
                  Descrição
                </th>
                <th scope="col" className="py-3 px-6 tracking-wider text-gray-700 uppercase dark:text-gray-400">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-[14px]">
              {entradasByOrigem && entradasByOrigem.map((entrada : any)  => (
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={entrada?.id}>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{entrada?.origem ? entrada?.origem : ''}</td>
                  <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white text-center">R$ {entrada?._sum.valor.toFixed(2)}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <p className="text-[20px] mt-8 mb-4">
            Valor Total das Saidas por Origem
          </p>
          <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 shadow-md shadow-blue-300">
            <thead className="bg-gray-100 dark:bg-gray-700 text-[14px] font-semibold">
              <tr>
                <th scope="col" className="py-3 px-6 tracking-wider text-gray-700 uppercase dark:text-gray-400">
                  Descrição
                </th>
                <th scope="col" className="py-3 px-6 tracking-wider text-gray-700 uppercase dark:text-gray-400">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-[14px]">
              {saidasByOrigem && saidasByOrigem.map((saida : any) => (
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={saida.id}>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{saida.origem ? saida.origem : ''}</td>
                  <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white text-center">R$ {saida._sum.valor.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}