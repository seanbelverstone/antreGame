import React from "react";
import { useRoutes } from "hookrouter";
import routes from "./utils/router";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";

const App = () => {

    const routeResult = useRoutes(routes);

    return (
        <>
            {routeResult || <PageNotFound />}
        </>
    )

}

export default App;
