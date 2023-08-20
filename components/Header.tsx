import { logout } from "@/lib/api/actions";
import { getUserCookies } from "@/utils/cookies";
import { TbLogout2 } from "react-icons/tb"
import ButtonMobile from "./ButtonMobile";


export default async function Header() {
    let user: any = getUserCookies('user')

    return (
        <header className="mb-4">
            <div className="lg:hidden text-black flex items-center p-4">
                <ButtonMobile />
            </div>

            <nav className="hidden relative lg:flex w-full lg:items-center lg:justify-center bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
                <div className="p-1 ml-4 absolute left-0">
                    <ul className="text-[18px] w-full">
                        {!user && (
                            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
                                <li className="mb-4 lg:mb-0 lg:pr-2">
                                    <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90" href="/register">
                                        Register
                                    </a>
                                </li>
                                <li className="mb-4 lg:mb-0 lg:pr-2">
                                    <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90" href="/login">
                                        Login
                                    </a>
                                </li>
                            </div>
                        )}
                        {user && (
                            <li className="mb-4 lg:mb-0 lg:pr-2 flex justify-center items-center">
                                <form action={logout} method="POST">
                                    <button className="flex justify-center items-center">
                                        <TbLogout2 className="text-[24px] text-blue-500" />
                                    </button>
                                </form>
                                <p
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90 text-blue-500"
                                >
                                    Olá, {user?.name}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="p-1">
                    <ul className="flex flex-col lg:flex-row lg:justify-center lg:items-center text-[18px]">
                        <li className="mb-4 lg:mb-0 lg:pr-2">
                        <a
                            className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                            href="/"
                            >Home</a>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pr-2">
                        <a
                            className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                            href="/entrada"
                            >
                            Entradas 
                        </a>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pr-2">
                        <a
                            className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                            href="/saida"
                            >
                            Saídas
                        </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <nav className="hidden z-30 align-middle text-[22px] border-b border-gray-600" id="navbar-mobile">
                <div className="p-1 ml-4">
                    <ul className="text-[18px] w-full">
                        {!user && (
                            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center">
                                <li className="mb-4 lg:mb-0 lg:pr-2">
                                    <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90" href="/register">
                                        Register
                                    </a>
                                </li>
                                <li className="mb-4 lg:mb-0 lg:pr-2">
                                    <a className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90" href="/login">
                                        Login
                                    </a>
                                </li>
                            </div>
                        )}
                        {user && (
                            <li className="mb-4 lg:mb-0 lg:pr-2 flex justify-center items-center gap-2">
                                <form action={logout} method="POST">
                                    <button className="flex justify-center items-center">
                                        <TbLogout2 className="text-[24px] text-blue-500" />
                                    </button>
                                </form>
                                <p
                                    className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90 text-blue-500"
                                >
                                    Olá, {user?.name}
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="p-1">
                    <ul className="flex flex-col items-center justify-center lg:flex-row lg:justify-center lg:items-center text-[18px]">
                        <li className="mb-4 lg:mb-0 lg:pr-2">
                        <a
                            className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                            href="/"
                            >Home</a>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pr-2">
                        <a
                            className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                            href="/entrada"
                            >
                            Entradas 
                        </a>
                        </li>
                        <li className="mb-4 lg:mb-0 lg:pr-2">
                        <a
                            className="block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                            href="/saida"
                            >
                            Saídas
                        </a>
                        </li>
                    </ul>
                </div>
    
            </nav>
        </header>
       
    )
}