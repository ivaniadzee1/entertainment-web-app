// pages/sign-in.tsx
"use client"
import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const resp = await signInWithEmailAndPassword(email, password);
      if (resp) {
        localStorage.setItem('user', JSON.stringify(resp.user));
        setEmail('');
        setPassword('');
        router.push('/home-page');
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMessage('Wrong email or password. Please try again.');
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage('Wrong email or password. Please try again.');
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#10141E] overflow-x-hidden">
      <img className="mb-4" src="/assets/img1.svg" alt="" />
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md border-2 mt-5 border-black rounded-md p-8 gap-y-3 bg-[#161D2F] mx-4">
        <h1 className="text-center mb-4 text-white text-2xl">Sign-in</h1>
        <input
          placeholder="Enter your Email"
          className="w-full border-b-2 text-white border-[#5A698F] bg-transparent h-10 px-3 mb-3 focus:outline-none"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          placeholder="Enter your Password"
          className="w-full border-b-2 text-white border-[#5A698F] bg-transparent h-10 px-3 mb-3 focus:outline-none"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button className="w-full h-12 bg-[#FC4747] p-2 text-white rounded-md" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign-in'}
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
        <Link href="/sign-up" className="text-[#FC4747] text-center mt-3"> Sign Up</Link>
      </form>
    </div>
  );
}
