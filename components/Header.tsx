export default function Header({ user } : any) {
    return (
        <header className="flex justify-center">
            <nav
                className="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
                
                <div className="flex items-center">
                    <button
                        className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 dark:hover:text-white dark:focus:text-white lg:hidden"
                        type="button"
                    >
                        <span className="[&>svg]:w-5">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-7 w-7">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </span>
                    </button>
                </div>

                <div className="!visible hidden w-full lg:!flex lg:justify-between">
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
                                <li className="mb-4 lg:mb-0 lg:pr-2 flex justify-center items-center">
                                    <form action="/logout" method="POST">
                                        <button className="flex justify-center items-center">
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
                    <div className="!visible mr-10"></div>
                </div>
                
            </nav>
        </header>
       
    )
}