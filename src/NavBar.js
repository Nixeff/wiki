function NavBar({ handleLoginClick }) {
    const handleClick = () => {
      handleLoginClick();
    };
    return (
      <div className="navbar">
        <div>
          <span onClick={handleClick} className="loginicon">
            Sign In
          </span>
        </div>
      </div>
    );
  }
  
  export default NavBar;