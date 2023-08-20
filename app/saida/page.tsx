import { deleteSaida } from "@/lib/api/actions";
import { getSaidas } from "@/lib/api/getters";

export default async function Saida() {
    let saidas: any = await getSaidas();

    return (
        <main className="text-[22px] text-center">
            <div className="mb-10">
                <p className="text-[32px]"> Saidas </p>
            </div>
            <div className="flex justify-start gap-4 mb-4">
                <a href="/saida/add">
                    <button type="button" className="bg-green-500 text-sky-50 text-[16px] p-2 rounded-md flex justify-center items-center gap-2">
                        Cadastrar Saida
                    </button>
                </a>

                <a href="/origem/saida">
                    <button type="button" className="bg-green-500 text-sky-50 text-[16px] p-2 rounded-md flex justify-center items-center gap-2">
                        Origem Saida
                    </button>
                </a>										
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
            
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Descrição
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Valor
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Dt. Registro
                        </th>
                        <th scope="col" colSpan={2} className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 rounded-lg">
                    {saidas && saidas.map((saida: any) => (
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{saida.origem ? saida.origem.nome : ''}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">R$ {saida.valor.toFixed(2)}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {(saida.createdAt.getDate() < 10 ? '0' + saida.createdAt.getDate() : saida.createdAt.getDate()) + '/' + 
                                ((saida.createdAt.getMonth() + 1 < 10) ? '0' + (saida.createdAt.getMonth() + 1) : (saida.createdAt.getMonth() + 1)) + '/' + 
                                (saida.createdAt.getFullYear())}
                            </td>
                            <td className="py-2 px-3 text-sm font-medium text-center whitespace-nowrap">
                                <div>
                                    <a href={`/saida/edit/${saida.id}`}> <button className="text-blue-600 outline outline-1 rounded-md p-1"> Editar </button> </a>
                                </div>
                            </td>
                            <td className="py-2 px-3 text-sm font-medium text-center whitespace-nowrap">
                                <form action={deleteSaida} method="POST" encType="multipart/form-data">
                                    <input type="hidden" id="id" name="id" value={saida?.id} />
                                    <button type="submit" className="text-red-600 outline outline-1 rounded-md p-1">Excluir</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}