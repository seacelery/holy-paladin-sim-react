import Tabs from "./Tabs/Tabs";
import ImportCharacter from "./ImportCharacter/ImportCharacter";
import "./Navbar.scss";

const Navbar = ({ activeTab, setActiveTab, characterImported }) => {
    return <div className="options-row-container">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {characterImported && (
            <ImportCharacter />
        )}
    </div>;
};

export default Navbar;
