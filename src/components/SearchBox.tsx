import { useState, useEffect } from "react";

const SearchBox = ({ setUsername, fetchData }: { setUsername: Function; fetchData: Function }) => {
    const [input, setInput] = useState("");

    useEffect(() => {
        // Load saved username from localStorage on component mount
        const savedUsername = localStorage.getItem("githubUsername");
        if (savedUsername) {
            setInput(savedUsername);
            setUsername(savedUsername);
        }
    }, [setUsername]);

    const handleInputChange = (e: any) => {
        setInput(e.target.value)
        setUsername(e.target.value);
    }

    const handleSearch = () => {
        // Save input value to localStorage when searching
        localStorage.setItem("githubUsername", input);
        fetchData();
    };

    return (
        <>
            <div className="flex gap-5 justify-between">
                <input
                    type="text"
                    placeholder="Github User Id"
                    className="input input-bordered input-primary w-full max-w-xs"
                    value={input}
                    onChange={handleInputChange} />

                <button className="btn btn-outline btn-primary" disabled={!input} onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}

export default SearchBox