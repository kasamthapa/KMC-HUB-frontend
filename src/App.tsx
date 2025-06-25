import { Provider } from "jotai";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./features/auth/components/SignUpForm";
import HomePage from "./features/home/HomePage";
import LoginForm from "./features/auth/components/LoginForm";
import CollaborationFeed from "./features/collaboration_feed/pages/CollaborationFeed";

function App() {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route  path="/feed" element={<CollaborationFeed/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
