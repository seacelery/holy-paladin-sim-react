import { useState } from "react";
import Header from "./components/Header/Header";

const App = () => {
    const [theme, setTheme] = useState("paladin");

    return (
        <>
            <Header />
        </>
    );
};

export default App;
