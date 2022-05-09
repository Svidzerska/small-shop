import React from "react";

import "./App.scss";

import Header from "./components/main_screen/header/Header";
import Search from "./components/main_screen/search/Search";
import Filter from "./components/main_screen/filter/Filter";
import Cards from "./components/main_screen/cards/Cards";

const App: React.FC = (): JSX.Element => {
    return (
        <>
            <Header />
            <main>
                <section className="panel">
                    <Search />
                    <Filter />
                </section>
                <Cards />
            </main>
        </>
    );
};

export default App;
