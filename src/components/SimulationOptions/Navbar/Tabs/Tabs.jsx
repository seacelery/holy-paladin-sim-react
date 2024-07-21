import "./Tabs.scss";

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        "Options",
        "Talents",
        "Equipment",
        "Buffs & Consumables",
        "Priority List",
    ];

    return (
        <>
            <nav className="options-navbar">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`options-tab ${
                            activeTab === tab ? "active" : "inactive"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </nav>
        </>
    );
};

export default Tabs;
