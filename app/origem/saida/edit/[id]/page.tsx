import { editOrigemSaida } from "@/lib/api/actions";
import { getOrigemSaidaById } from "@/lib/api/getters";
import observer from "@/lib/api/observer"

export default async function EditOrigemSaida({ params: { id }} : { params : {id: number} }) {
    observer()
    const origemSaida = await getOrigemSaidaById(id);

    return (
        <main className="text-[18px] text-center">
            <a href="/origem/saida">
                <button type="submit" className="bg-blue-500 text-sky-50 rounded-sm p-2 mb-4">
                    Voltar
                </button>
            </a>
            <div>
                <p className="text-[32px] mb-8">
                    Editar Origem Saida
                </p>
            </div>
            <div className="flex justify-center">
                <form action={editOrigemSaida} method="POST">
                    <input type="hidden" name="id" id="id" value={id} />
                    <label className="block mb-4 text-[16px]">
                        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700">
                            Nome
                        </span>
                        <input name="origem" id="origem" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" defaultValue={origemSaida?.nome} required />
                    </label>

                    <button type="submit" className="bg-green-500 text-sky-50 rounded-sm p-2">
                        Salvar
                    </button>
                </form>
            </div>
        </main>
    )
}