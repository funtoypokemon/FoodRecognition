import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import AuthContextProvider from "./contexts/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PostContextProvider from "./contexts/PostContext";
import React, { useState, useEffect } from "react";
//import IngreContextProvider from "./contexts/IngreContext";

import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";
import Food from "./views/Food";
import Ingredient from "./views/Ingredient";
import Blog from "./views/Blog";
import Write from "./views/Write";
import SinglePost from "./components/singlePost/SinglePost";
import Aboutme from "./views/Aboutme";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/landing" component={Landing} />
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            />
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            />
            <ProtectedRoute exact path="/" component={Blog} />
            <ProtectedRoute exact path="/write" component={Write} />
            <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            <ProtectedRoute exact path="/ingredient" component={Ingredient} />
            <ProtectedRoute path="/post/:postId" component={SinglePost} />
            <ProtectedRoute path="/food" component={Food} />
            <ProtectedRoute path="/aboutme" component={Aboutme} />

            {/* <ProtectedRoute exact path="/about" component={About} /> */}
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
