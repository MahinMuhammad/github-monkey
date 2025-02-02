import AboutPage from "./AboutPage"

const CustomNavbar = () => {
    const infoButtonTapped = () =>{
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
        if (modal){
            modal.showModal();
        }else{
            console.error("Modal with ID 'my_modal_2' not found.");
        }
    }
    return (
        <div className="nav-bar flex justify-between">
            <AboutPage/>

            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                GitHub<span className="text-blue-500">Monkey</span>
            </h1>

            <button className="btn btn-sm btn-circle" onClick={infoButtonTapped}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="12" y1="18" x2="12" y2="11"></line>
                    <line x1="12" y1="6" x2="12.01" y2="6"></line>
                </svg>
            </button>
        </div>
    )
}

export default CustomNavbar