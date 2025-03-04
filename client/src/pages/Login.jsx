import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterUserMutation } from "@/features/api/authApi";
import { useLoginUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { use } from "react";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [registerUser, {data: registerData, error: registerError, isLoading:registerIsLoading, isSuccess: registerIsSuccess}] = useRegisterUserMutation();

  const [loginuser, {data: loginData, error: loginError, isLoading:loginIsLoading, isSuccess: loginIsSuccess}] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputhandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegisteration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginuser;
    await action(inputData);
  };

useEffect(() => {
  if(registerIsSuccess && registerData){
    toast.success(registerData.message || "Signup successful");
  }
  if(registerError){
    toast.error(registerError.data.message || "Signup failed");
  }
  if(loginIsSuccess && loginData){
    toast.success(loginData.message || "Login successful");
    navigate("/");
  }
  if(loginError){
    toast.error(loginError.data.message || "Login failed");
  }
}, [registerIsLoading, loginData, loginError, loginIsLoading, loginError, registerError]);

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputhandler(e, "signup")}
                  placeholder="Eg. John Elia"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputhandler(e, "signup")}
                  placeholder="Eg. johnelia@example.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputhandler(e, "signup")}
                  placeholder="Eg. abc"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegisteration("signup")}>
              {
                  registerIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                    </>
                     
                  ): "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputhandler(e, "login")}
                  placeholder="Eg. johnelia@example.com"
                  required="true"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputhandler(e, "login")}
                  placeholder="Eg. abc"
                  required="true"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegisteration("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                    </>
                     
                  ): "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
