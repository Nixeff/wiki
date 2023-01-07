import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ChangePath(path){
    const navigate = useNavigate();
    navigate(path);
}