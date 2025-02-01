import SearchBox from "../../components/SearchBox";
import ListTab from "../../components/ListTab";
import FollowList from "../../components/FollowList";
import { useState } from "react";
import { GitHubUser } from "../../models/GithubUser";
import { fetchGitHubUserData } from "../../api/github";

function Home() {
    const [username, setUsername] = useState("");
    const [followersData, setFollowersData] = useState<GitHubUser[]>([]);
    const [followingData, setFollowingData] = useState<GitHubUser[]>([]);
    const [currentList, setCurrentList] = useState<GitHubUser[]>([]);
    const [tab, setTab] = useState(0);

    const handleFetchData = async () => {
        if (!username) return;
        const followers = await fetchGitHubUserData(username, "followers");
        const following = await fetchGitHubUserData(username, "following");
        setFollowersData(followers);
        setFollowingData(following);
    };

    const getWhoDoesntFollowBack = () => {
        return followingData.filter(
            (followingUser) => !followersData.some((f) => f.login === followingUser.login)
        );
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
        <div className="common-container">
            {/* Search Box */}
            <SearchBox setUsername={setUsername} fetchData={handleFetchData} />

            {/* Result */}
            <div className="mt-5">
                {/* List Tab */}
                <ListTab setTab={handleTabSwitch} />

                {/* List */}
                <FollowList userList={currentList} />
            </div>
        </div>
    );
}

export default Home;
