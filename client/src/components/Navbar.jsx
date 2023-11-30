import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar">
      <Link className="navLink" to="/login">
        Login
      </Link>
      <Link className="navLink" to="/reg">
        Reg
      </Link>
      {/* TODO для теста одного клиента (потом удалить)  */}
      <Link className="navLink" to="/clients/1">
        Clients
      </Link>
      <Link className="navLink" to="/dashboard">
        Dashboard
      </Link>
      <Link className="navLink" to="/add-clients">
        Add Clients
      </Link>
      <Link className="navLink" to="/knowledge">
        Knowledge
      </Link>
      <Link className="navLink" to="/statistics">
        Statistics
      </Link>
    </div>
  );
}
