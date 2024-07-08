import Logo from "../Logo/Logo";
import ReactiveInput from "../ReactiveInput/ReactiveInput";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

function Header() {
  return (
    <header>
      <div className="header-wrapper">
        <div className="left-column">
          <Logo />
        </div>
        <div className="right-column">
          <ReactiveInput />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

export default Header;
