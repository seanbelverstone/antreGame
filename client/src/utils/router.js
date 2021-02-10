import React from "react";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";
import SelectCharacter from "../components/SelectCharacter";
import CreateCharacter from "../components/CreateCharacter";
import DecisionBlock from "../components/DecisionBlock";

const routes = {
  "/": () => <Login />,
  "/account": () => <CreateAccount />,
  "/select": () => <SelectCharacter />,
  "/create": () => <CreateCharacter />,
  "/play": () => <DecisionBlock />
};

export default routes;
