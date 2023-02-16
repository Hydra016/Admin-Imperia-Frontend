import React from "react";
import Recipes from "./components/recipes/recipes";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./utils.js/ProtectedRoute";
import { useSelector } from "react-redux";
import SignUp from "./components/users/SignUp";
import _ from "lodash";
import Home from "./components/Main/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import RecipePost from "./components/recipes/recipePost";
import Error from "./components/Error";

const App = () => {
  const user = useSelector((state) => state.user.isLoggedIn);
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/Logout" element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/Dashboard' element={
          <ProtectedRoute user={user}>
          <Dashboard />
          </ProtectedRoute>
          }>
            <Route index element={
              <ProtectedRoute user={user}>
                <Recipes />
              </ProtectedRoute>
            }/>
            <Route path="Create" element={
              <ProtectedRoute user={user}>
                <RecipePost />
              </ProtectedRoute>
            }/>
            <Route path="Signup" element={
              <ProtectedRoute user={user}>
                <SignUp />
              </ProtectedRoute>
            }/>
            <Route />
          </Route>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
