import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api/firebase";

export const AuthLayout = () => {
  const [email, setEmail] = useState(""); // email ve passwordu state'de tutuyorum
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // ✅ formun sayfayı yenilemesini engelle
    try {
      //firebase email fonksiyonunu çağırıp içerisine atadığım verilerle çağırıyorum
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Giriş Başarılı ✅:", userCredential.user);
      navigate("/dashboard"); // ✅ giriş başarılı olursa yönlendir
    } catch (error) {
      console.log("Giriş Hatası ❌:", error.message);
      alert("E-posta veya şifre hatalı!");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eae9e4] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-white/40">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-16 w-auto mb-4" />
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-[#151212] mb-1">
              E-posta
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} //bunun ne işe yaradığını anlmadım bu olmazsa inputa değer giremiyorum
              required
              placeholder="info@iqmoney.com.tr"
              className="w-full px-4 py-2 rounded-lg border border-gray-300/30 bg-white/20 text-[#151212] placeholder-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#151212] mb-1">
              Şifre
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-gray-300/30 bg-white/20 text-[#151212] placeholder-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#151212]">
              <input
                type="checkbox"
                className="h-4 w-4 text-orange-400 rounded"
              />
              <span>Beni hatırla</span>
            </label>
            <a href="#" className="text-orange-400 hover:underline">
              Şifremi unuttum
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-sm text-[#151212] mt-6">
          Hesabın yok mu?{" "}
          <a href="#" className="font-medium text-orange-400 hover:underline">
            Kayıt ol
          </a>
        </p>
      </div>
    </div>
  );
};
