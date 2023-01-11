import React, { useState } from "react";
import { loadLS, saveLS } from "./localStorage";
import { confirmAlert } from 'react-confirm-alert'; // Import

export default function checkToken(checkMessage) {
    //const navigate = useNavigate();
    const reload = () => {
        window.location.reload(false);
    }

    const submit = () =>{
        confirmAlert({
            title: 'Din token är utdaterad',
            message: 'Du kommer bli utloggad, logga in för att försöka igen',
            buttons: [
                {
                label: 'Ok',
                onClick: () => reload()
                }
            ]
        });
    };
    const expiredTokenMessage = "Token is invalid or expired";
    const check = (checkMessage === expiredTokenMessage);
    if(check) {
    console.log("Token expired");
    saveLS("userType", "", 1, "/");
    saveLS("uID", "", 1, "/");
    saveLS("uname", "", 1, "/");
    saveLS("token", "", 1, "/");
    submit();
    }
    

    
}