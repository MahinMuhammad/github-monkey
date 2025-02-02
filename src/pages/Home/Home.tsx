import SearchBox from "../../components/SearchBox";
import ListTab from "../../components/ListTab";
import FollowList from "../../components/FollowList";
import { useState } from "react";
import { GitHubUser } from "../../models/GithubUser";
import { fetchGitHubUserData } from "../../api/github";
import CustomNavbar from "../../components/CustomNavbar";

function Home() {
    const [username, setUsername] = useState("");
    const [followersData, setFollowersData] = useState<GitHubUser[]>([]);
    const [followingData, setFollowingData] = useState<GitHubUser[]>([]);
    const [currentList, setCurrentList] = useState<GitHubUser[]>([]);
    const [tab, setTab] = useState(0);
    const [haveSearched, setHaveSearched] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const handleFetchData = async () => {
        alert(username)
        if (!username.trim()) return;
        setHaveSearched(true);
        setLoading(true)
        const followers = await fetchGitHubUserData(username, "followers");
        const following = await fetchGitHubUserData(username, "following");
    
        setFollowersData(followers);
        setFollowingData(following);
    
        if (tab === 0) setCurrentList(followers);
        else if (tab === 1) setCurrentList(following);
        else setCurrentList(getWhoDoesntFollowBack());
        setLoading(false)
    };    

    const getWhoDoesntFollowBack = () => {
        return [
            ...followingData.filter(f => !followersData.some(follower => follower.id === f.id))
        ];
    };

    const handleTabSwitch = (selectedTab: number) => {
        setTab(selectedTab);

        switch (selectedTab) {
            case 0:
                setCurrentList(followersData);
                break;
            case 1:
                setCurrentList(followingData);
                break;
            case 2:
                setCurrentList(getWhoDoesntFollowBack());
                break;
            default:
                setCurrentList(followersData);
                break;
        }
    };

    return (
        <>
            <CustomNavbar/>
            <div className="common-container">
                {/* Search Box */}
                <SearchBox setUsername={setUsername} fetchData={handleFetchData} />

                {/* Result */}
                <div className={`relative mt-5 ${haveSearched === false ? "hidden" : ""}`}>
                    {/* List Tab */}
                    <ListTab setTab={handleTabSwitch} />

                    {/* List */}
                    <FollowList userList={currentList} />
                    <div className={`absolute top-0 left-0 h-full w-full skeleton h-32 w-32 
                        ${isLoading === false ? "hidden" : ""}`}></div>
                </div>
            </div>
        </>
    );
}

export default Home;
