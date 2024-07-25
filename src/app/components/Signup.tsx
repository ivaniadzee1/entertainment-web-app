"use client";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid Gmail address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      const resp = await createUserWithEmailAndPassword(email, password);
      if (resp) {
        localStorage.setItem('signupEmail', email);
        localStorage.setItem('signupPassword', password);
        setEmail('');
        setPassword('');
        router.push('/sign-in');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#10141E] overflow-x-hidden pt-[10vh]">
      <img className="mb-4" src="/assets/img1.svg" alt="" />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md border-2 border-black rounded-md p-8 gap-y-3 bg-[#161D2F] mx-4"
      >
        <h1 className="text-center mb-4 text-white text-2xl">Sign Up</h1>
        <input
          placeholder="Enter your Email"
          className="w-full border-b-2 border-[#5A698F] text-white bg-transparent h-10 px-3 mb-3 focus:outline-none"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />

        <input
          placeholder="Enter your Password"
          className="w-full border-b-2 border-[#5A698F] text-white bg-transparent h-10 px-3 mb-3 focus:outline-none"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button
          className="w-full h-12 bg-[#FC4747] text-white rounded-md"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign-up'}
        </button>

        {errorMessage && (
          <p className="text-red-500 text-center mt-3">{errorMessage}</p>
        )}

        <Link href="/sign-in" className="text-[#FC4747] text-center mt-3">Sign-in</Link>
      </form>
    </div>
  );
}
