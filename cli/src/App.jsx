import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pagess/Home";
import Layoutt from "./pagess/Layoutt";
import { Dashboard } from "./pagess/Dashboard";
import { Articles } from "./pagess/Articles";
import Blogtitle from "./pagess/Blogtitle";
import GenrateIm from "./pagess/GenrateIm";
import Review from "./pagess/Review";
import Community from "./pagess/Community";
import Removeobj from "./pagess/Removeobj";
import RemoveBackground from "./pagess/RemoveBackground";

import { SignIn, SignUp, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => {
      console.log("Token:", token);
    });
  }, []);

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public home page */}
        <Route path="/" element={<Home />} />

        {/* Redirect signed-in users away from sign-in/up pages */}
        <Route
          path="/sign-in"
          element={
            <SignedOut>
              <SignIn redirectUrl="/ai" />
            </SignedOut>
          }
        />
        <Route
          path="/sign-up"
          element={
            <SignedOut>
              <SignUp redirectUrl="/ai" />
            </SignedOut>
          }
        />

        {/* Protect /ai routes: only accessible when signed in */}
        <Route
          path="/ai/*"
          element={
            <SignedIn>
              <Layoutt />
            </SignedIn>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="w-a" element={<Articles />} />
          <Route path="bt" element={<Blogtitle />} />
          <Route path="gen" element={<GenrateIm />} />
          <Route path="rev" element={<Review />} />
          <Route path="com" element={<Community />} />
          <Route path="ro" element={<Removeobj />} />
          <Route path="remback" element={<RemoveBackground />} />
        </Route>

        {/* Redirect unauthenticated users trying to access /ai to /sign-in */}
        <Route
          path="/ai/*"
          element={<Navigate to="/sign-in" replace />}
        />

        {/* Catch-all route (optional): redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
