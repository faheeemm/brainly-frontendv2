import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  async function Signin() {
    const username = usernameRef.current?.value;
    console.log(username)
    const password = passwordRef.current?.value;
    console.log(password)
    
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
        username, password
    });

    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    // TODO: Redirect the user to the dashboard
    navigate("/dashboard");
  }
  
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        
        <Input ref={usernameRef} placeholder="username" />
        <Input ref={passwordRef} placeholder="password" />
        <div className="flex justify-center items-center pt-4">
          <Button onClick={Signin} variant="primary" text="Signin" fullWidth={true} loading={false} />
        </div>
        
      </div>
    </div>
  );
};
