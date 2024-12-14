"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Registration attempt", { username, password, employeeId });
      router.push("/books");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again.",
        variant: "destructive",
      });
      setUsername("");
      setPassword("");
      setEmployeeId("");
    }
  };

  const checkUsername = async () => {
    // TODO: Implement username availability check
    console.log("Checking username availability", username);
    toast({
      title: "Username available",
      description: "You can use this username.",
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Button type="button" onClick={checkUsername}>
              Check
            </Button>
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </Layout>
  );
}
