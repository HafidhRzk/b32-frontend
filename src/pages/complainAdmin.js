import Nav2 from "./components/navbar2"
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

let socket;

function ComplainAdmin(){
  
    useEffect(() => {
      socket = io(Process.env.SERVER_URL || 
        'https://b32-backend-dumbways.herokuapp.com/api/v1/' || 
        'http://localhost:5000/api/v1/');
  
      return () => {
        socket.disconnect();
      };
    }, []);
  
    return (
      <>
        <Nav2 />
      </>
    );
}

export default ComplainAdmin;