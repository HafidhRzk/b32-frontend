import Nav from "./components/navbar"
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

let socket;

function Complain(){
  
    useEffect(() => {
      socket = io(Process.env.REACT_APP_SERVER_URL); 
  
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