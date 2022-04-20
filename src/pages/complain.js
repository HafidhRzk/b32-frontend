import Nav from "./components/navbar"
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

let socket;

function Complain(){
  
    useEffect(() => {
      socket = io('https://localhost:5000/api/v1'); 
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <>
        <Nav />
      </>
    );
}

export default Complain;