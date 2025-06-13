import { login } from "./features/auth/api/auth";
import { authAtomWithStorage } from "./jotai/auth";
import { Header } from "./shared/Header";
import { useAtom } from "jotai";

function TestLogin() {
  const [, setAuth] = useAtom(authAtomWithStorage);
  const handleLogin = async () => {
    try {
      const response = await login({
        // idNumber: "80100016",
        // name: "Test User",
        email: "binaychaudhary2062@gmail.com",
        password: "Binay123",
        // role: "Student",
      });
      setAuth({ user: response.User, token: response.token });
      console.log("signup Successfull");
    } catch (e) {
      console.log("singup unsuccessful", e);
    }
  };
  return <button onClick={handleLogin}>Test Signup</button>;
}
function App() {
  return (
    <>
      <Header />
      <TestLogin />
    </>
  );
}

export default App;
