import React,{useState} from 'react';
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import  Pet  from "./Pet";
import SearchParams from './SearchPrams';
import {Router,Link} from "@reach/router"; 
import Details from './Details';
import ThemeContext from './ThemeContext';
const App = () => {
    const themeHook = useState("darkblue");
return (
    <React.StrictMode>
        <ThemeContext.Provider value={themeHook}>
<div>
    <header >
<Link to="/">Adopt Me!</Link>
    </header>
<Router>
<SearchParams path="/"/>
<Details path="/details/:id"/>
</Router>
</div>
</ThemeContext.Provider>
</React.StrictMode>
);
};
// const Appln = () => {
//   return React.createElement("div", {}, "Adopt Me!");
// };

ReactDOM.render(<App/>, document.getElementById("applic"));

// return React.createElement('div',
// {id: "something-important"},
// [
//     React.createElement("h1",{},"Adopt Me!"),

// ]);
