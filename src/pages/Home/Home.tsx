import SearchBox from "../../components/SearchBox";
import ListTab from "../../components/ListTab";
import FollowList from "../../components/FollowList";
import { useState } from "react";
import { GitHubUser } from "../../models/GithubUser";
import { fetchGitHubUserData } from "../../api/github";
import CustomNavbar from "../../components/CustomNavbar";

function Home() {
    const [username, setUsername] = useState("");
    const [followersList, setFollowersList] = useState<GitHubUser[]>([]);
    const [followingList, setFollowingList] = useState<GitHubUser[]>([]);
    const [currentList, setCurrentList] = useState<GitHubUser[]>([]);
    const [tab, setTab] = useState(0);
    const [showResult, setShowResult] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const handleFetchData = async () => {
        if (!username.trim()) {
            alert("Please enter a GitHub username.");
            return;
        }
    
        setShowResult(true);
        setLoading(true);
    
        try {
            const followers = await fetchGitHubUserData(username, "followers");
            const following = await fetchGitHubUserData(username, "following");
    
            setFollowersList(followers);
            setFollowingList(following);
    
            if (tab === 0) setCurrentList(followers);
            else if (tab === 1) setCurrentList(following);
            else setCurrentList(getWhoDoesntFollowBack());
        } catch (error: any) {
            console.log(error)
            alert(error.message); // Shows the exact error message
            setShowResult(false);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    };      

    const getWhoDoesntFollowBack = () => {
        return [
            ...followingList.filter(f => !followersList.some(follower => follower.id === f.id))
        ];
    };

    const handleTabSwitch = (selectedTab: number) => {
        setTab(selectedTab);

        switch (selectedTab) {
            case 0:
                setCurrentList(followersList);
                break;
            case 1:
                setCurrentList(followingList);
                break;
            case 2:
                setCurrentList(getWhoDoesntFollowBack());
                break;
            default:
                setCurrentList(followersList);
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
                <div className={`relative mt-5 ${showResult === false ? "hidden" : ""}`}>
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
