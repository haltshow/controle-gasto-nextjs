export default function Toast({ status, mensagem } : {status: string, mensagem: string}) {
    let showToast = true;
    return (
        <div>
            {showToast && status == 'success' && (
                <div className="bg-green-500 text-white rounded-md p-2 absolute top-10 left-[50%] translate-x-[-50%] flex justify-center items-center gap-2">
                    <button onClick={() => {showToast=false}} className="bg-white text-black rounded-full px-1.5 py-0 text-[14px]">x</button>
                    <p className="text-[16px]">{mensagem}</p>
                </div>
            )}
            
        </div>
    )
}