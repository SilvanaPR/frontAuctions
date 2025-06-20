"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import RegisterModal from '../components/User/RegisterModal';
import ChangePasswordModal from '../components/User/ChangePasswordModal';
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();


    if (email === "admin@correo.com" && password === "123") {
      toast.success("Inicio de sesión exitoso!");
      router.push("/Producto");
    } else {
      toast.error("Correo o contraseña incorrectos");
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-1" src="/clickbid logo.png" alt="logo" />
          ClickBid
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Inicio de Sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  placeholder="usuario@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowChangePassword(true)}
                  className="text-sm font-medium text-brand hover:underline"
                >
                  Olvidaste tu contraseña?
                </button>
              </div>


              <button type="submit" className="w-full text-white bg-brand hover:bg-brandLight font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-500 mt-4">
                No tienes una cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="font-medium text-brand hover:underline"
                >
                  Regístrate
                </button>
              </p>

            </form>
            
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
            {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
            

          </div>
        </div>
      </div>
    </section>
  );
}
