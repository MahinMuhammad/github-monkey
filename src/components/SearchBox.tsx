import { useState } from "react";

const SearchBox = ({ setUsername, fetchData }: { setUsername: Function; fetchData: Function }) => {
    const [input, setInput] = useState("");

    const handleInputChange = (e: any) => {
        setInput(e.target.value)
        setUsername(e.target.value);
    }

    const handleSearch = () => {
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

                <button className="btn btn-outline btn-primary" onClick={handleSearch}>Search</button>
            </div>
        </>
    )
}

export default SearchBox