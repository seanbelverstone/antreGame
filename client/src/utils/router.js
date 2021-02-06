import React from "react";
import Login from "../components/Login";
import CreateAccount from "../components/CreateAccount";
import SelectCharacter from "../components/SelectCharacter";
import CreateCharacter from "../components/CreateCharacter"

const routes = {
  "/": () => <Login />,
  "/account": () => <CreateAccount />,
  "/select": () => <SelectCharacter />,
  "/create": () => <CreateCharacter />,
};

export default routes;
