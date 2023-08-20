import { editEntrada } from "@/lib/api/actions";
import { getOrigemEntrada, getEntradaById } from "@/lib/api/getters";
import observer from "@/lib/api/observer"

export default async function EditEntrada({ params: { id }} : { params : {id: number} }) {
    observer()
    let origemEntrada = await getOrigemEntrada();

    let entrada = await getEntradaById(id);

    return (
        <main className="text-[18px] text-center">
            <a href="/entrada">
                <button type="submit" className="bg-blue-500 text-sky-50 rounded-sm p-2 mb-4">
                    Voltar
                </button>
            </a>
            <div>
                <p className="text-[32px] mb-8">
                    Editar Entrada
                </p>
            </div>
            <div className="flex justify-center">
                <form action={editEntrada} method="POST">
                    <input type="hidden" name="id" id="id" value={id} />
                    <label className="block mb-4 text-[16px]">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700">
                            Origem
                        </span>
                        <select name="origem" id="origem" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            {origemEntrada && origemEntrada.map((origem) => (
                                <>
                                    {origem?.nome == entrada?.origem?.nome ? (
                                        <option value={origem.id} selected key={origem.id}>{origem.nome}</option>
                                    ) : (
                                        <option value={origem.id} key={origem.id}>{origem.nome}</option>
                                    )}
                                </>
                            ))}
                        </select>
                    </label>
                    
                    <label className="block mb-4 text-[16px]">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700">
                            Valor
                        </span>
                        <input type="text" name="valor" id="valor" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
                            placeholder="Insira a Origem da Entrada"
                            defaultValue={entrada.valor} required />
                    </label>

                    <button type="submit" className="bg-green-500 text-sky-50 rounded-sm p-2">
                        Salvar
                    </button>
                </form>
            </div>
        </main>
    )
}