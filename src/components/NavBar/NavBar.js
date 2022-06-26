import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router";


const NavBar = () => {
  const history = useHistory();
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {    
    setValue(newValue);
    history.push(newValue)
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} value="/" />
        <Tab label="Favorites" index={1} value="/favorites" />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
