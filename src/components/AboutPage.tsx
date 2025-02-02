import monkeyIconWhite from "/monkey-White.png"
import monkeyIconBlack from "/monkey-black.png"
import { useEffect, useState } from "react";
const AboutPage = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Function to check the current theme
        const checkTheme = (e:any) => {
            setIsDarkMode(e.matches);
        };

        // Set initial theme based on the user's preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        // Add event listener for changes in the theme
        mediaQuery.addEventListener('change', checkTheme);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', checkTheme);
        };
    }, []);

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <div className="container mx-auto px-4 py-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-400 mb-4">
                        About GitHub Monkey
                        <img src={isDarkMode ? monkeyIconWhite : monkeyIconBlack} alt="Monkey Icon" className="inline w-6 h-6 ml-2" />
                    </h1>
                    <p className="text-lg text-gray-500 mb-6">
                        GitHub Monkey is a simple and intuitive web app that lets you explore a GitHub user's{" "}
                        <strong>followers</strong>, <strong>following</strong>, and find out <strong>who doesn't follow back💪</strong>—all in one place.
                    </p>

                    <p className="text-lg text-gray-500 mb-6">
                        🛠️Built with <strong>React.js + Vite</strong>, this app delivers <strong>🚀fast and seamless experience</strong> while fetching data from GitHub's API.
                    </p>

                    <div className="mt-8">
                        <p className="text-gray-600 font-semibold">Made with ❤️ by Md Mahinur Rahman</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-gray-500">
                            Monkey icon by:{" "}
                            <a
                                href="https://www.flaticon.com/free-icons/monkey"
                                title="monkey icons"
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Monkey icons created by Freepik - Flaticon
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default AboutPage