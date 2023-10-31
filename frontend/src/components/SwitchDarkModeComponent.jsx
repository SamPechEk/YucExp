import { useEffect, useState } from "react";
import {Switch} from "@nextui-org/react";
import { MoonIconComponent } from './Icons/MoonIconComponent';
import { SunIconComponent } from './Icons/SunIconComponent';
function SwitchDarkModeComponent() {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Switch
      defaultSelected
      size="lg"
      color="warning"
      startContent={<SunIconComponent />}
      endContent={<MoonIconComponent />}
      onClick={handleChangeTheme}
    >
      
    </Switch>
  );
}
export default SwitchDarkModeComponent;