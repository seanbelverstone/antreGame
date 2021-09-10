import React from "react";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import SelectCharacter from "../pages/SelectCharacter";
import CreateCharacter from "../pages/CreateCharacter";
import MainStory from "../pages/MainStory";
import store from '../redux/store';

const routes = {
  "/": () => <Login />,
  "/account": () => <CreateAccount />,
  "/select": () => <SelectCharacter />,
  "/create": () => <CreateCharacter />,
  "/play": () => <MainStory />
};

export default routes;
