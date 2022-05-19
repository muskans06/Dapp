import React from "react";
function Header(props){
    return (
        <div className="header" >
        <h2>SmartiElection</h2>
        <div className="title">
        <h5 >Welcome to the World of voting with Blockchain!</h5>
        <p >Current Connected Account : {props.account ? props.account : "not connected"}</p>
        </div>
        </div>
        
    );
}
export default Header;