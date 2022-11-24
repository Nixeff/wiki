import "./styles.css";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import NavBar from "./NavBar";

export default function App() {
  const [isShowLogin, setIsShowLogin] = useState(true);

  const handleLoginClick = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  return (
    <div className="App">
      <NavBar handleLoginClick={handleLoginClick} />
      <LoginForm isShowLogin={isShowLogin} />
    </div>
  );
}