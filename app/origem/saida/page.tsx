import { deleteOrigemSaida } from "@/lib/api/actions";
import { getOrigemSaida } from "@/lib/api/getters";

export default async function OrigemSaida() {
    const origens: any = await getOrigemSaida();
    
    return (
        <main className="text-[22px] text-center">
            <div className="mb-10">
                <p className="text-[32px]"> Origem Saida </p>
            </div>
            <div className="flex justify-start gap-4 mb-4">
                <a href="/origem/saida/add">
                    <button type="button" className="bg-green-500 text-sky-50 text-[16px] p-2 rounded-md flex justify-center items-center gap-2">
                        Cadastrar Origem Saida
                    </button>
                </a>										
            </div>
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Descrição
                        </th>
                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Dt. Registro
                        </th>
                        <th scope="col" colSpan={2} className="py-3 px-6 text-xs font-medium tracking-wider text-gray-700 uppercase dark:text-gray-400">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {origens.length > 0 && origens.map((origem: any) => (
                        <tr className="hover:bg-gray-100 dark:hover:bg-gray-700" key={origem?.id}>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{origem.nome}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {(origem.createdAt.getDate() < 10 ? '0' + origem.createdAt.getDate() : origem.createdAt.getDate()) + '/' + 
                                ((origem.createdAt.getMonth() + 1 < 10) ? '0' + (origem.createdAt.getMonth() + 1) : (origem.createdAt.getMonth() + 1)) + '/' + 
                                (origem.createdAt.getFullYear())}
                            </td>
                            <td className="py-2 px-3 text-sm font-medium text-center whitespace-nowrap">
                                <a href={`/origem/saida/edit/${origem.id}`}> <button className="text-blue-600 outline outline-1 rounded-md p-1"> Editar </button> </a>
                            </td>
                            <td className="py-2 px-3 text-sm font-medium text-center whitespace-nowrap">
                                <form action={deleteOrigemSaida} method="POST">
                                    <input type="hidden" value={origem?.id} name="id" id="id" />
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