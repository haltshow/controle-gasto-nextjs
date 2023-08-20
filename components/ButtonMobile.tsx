"use client"

export default function ButtonMobile() {
    async function openNavBar() {
        const element = document.getElementById('navbar-mobile');
        if (element) element.classList.toggle('hidden')
    }

    return (
        <button onClick={openNavBar} className="z-50 space-y-2 lg:hidden" aria-label="Menu Mobile">
            <div className="w-8 h-0.5 bg-black"></div>
            <div className="w-8 h-0.5 bg-black"></div>
            <div className="w-8 h-0.5 bg-black"></div>
        </button>
    )
}