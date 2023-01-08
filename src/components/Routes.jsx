import React from "react";
import { Routes, Route } from "react-router-dom";
import { Landing } from "./Landing";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Todo } from "./Todo";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
};
