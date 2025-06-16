import { Provider } from "jotai";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./features/auth/components/SignUpForm";
import HomePage from "./features/home/HomePage";
import LoginForm from "./features/auth/components/LoginForm";

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
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
