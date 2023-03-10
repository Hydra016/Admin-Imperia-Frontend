import React, { Suspense } from "react";
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
import RecipePost from "./components/recipes/RecipePost";
import Error from "./components/Error";
import SingleRecipe from "./components/recipes/SingleRecipe";
import AllUsers from "./components/users/AllUsers";
import Approval from "./components/users/Approval";
import MyRecipes from "./components/recipes/MyRecipes";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./locals/en/common.json"
import translationLv from "./locals/lv/common.json"
import SingleUserRecipe from "./components/recipes/RecipesBySingleUser";

const App = () => {
  const user = useSelector((state) => state.user.isLoggedIn);
  const {lang} = useSelector((state) => state.common);
  
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: translationEn },
      lv: { translation: translationLv }
    },
    lng: lang,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  })

  return (
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="Signup" element={<SignUp />}/>
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
            <Route />
            <Route path="Recipe/:id" element={
              <ProtectedRoute user={user}>
                <SingleRecipe />
              </ProtectedRoute>
            }/>
            <Route path="Users" element={
              <ProtectedRoute user={user}>
                <AllUsers />
              </ProtectedRoute>
            }/>
            <Route />
            <Route path="Requests" element={
              <ProtectedRoute user={user}>
                <Approval />
              </ProtectedRoute>
            }/>
            <Route path="myRecipes" element={
              <ProtectedRoute user={user}>
                <MyRecipes />
              </ProtectedRoute>
            }/>
            <Route path="Recipes/:id" element={
              <ProtectedRoute user={user}>
                <SingleUserRecipe />
              </ProtectedRoute>
            }/>
            <Route />
          </Route>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
      </Suspense>
  );
};

export default App;
