import { useState } from "react";

const ListTab = ({ setTab }: { setTab: (tab: number) => void }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (tab: number) => {
        setActiveTab(tab);
        setTab(tab);
    };

    return (
        <div className="tabs tabs-border">
            <a
                className={`tab ${activeTab === 0 ? "tab-active" : ""}`}
                onClick={() => handleTabChange(0)}
            >
                Followers
            </a>
            <a
                className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
                onClick={() => handleTabChange(1)}
            >
                Following
            </a>
            <a
                className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
                onClick={() => handleTabChange(2)}
            >
                Doesn't follow back
            </a>
        </div>
    );
};

export default ListTab;
