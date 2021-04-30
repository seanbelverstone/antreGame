import React from "react";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import SelectCharacter from "../pages/SelectCharacter";
import CreateCharacter from "../pages/CreateCharacter";
import DecisionBlock from "../pages/DecisionBlock";

const routes = {
  "/": () => <Login />,
  "/account": () => <CreateAccount />,
  "/select": () => <SelectCharacter />,
  "/create": () => <CreateCharacter />,
  "/play": () => <DecisionBlock />
};

export default routes;
