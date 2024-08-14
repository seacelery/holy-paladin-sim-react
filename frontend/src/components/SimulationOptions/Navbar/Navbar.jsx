import Tabs from "./Tabs/Tabs";
import ImportCharacter from "./ImportCharacter/ImportCharacter";
import "./Navbar.scss";

const Navbar = ({ activeTab, setActiveTab, characterImported, loading, setLoading, setImporting }) => {
    return <div className="options-row-container">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {characterImported && (
            <ImportCharacter setActiveTab={setActiveTab} loading={loading} setLoading={setLoading}setImporting={setImporting} />
        )}
    </div>;
};

export default Navbar;
