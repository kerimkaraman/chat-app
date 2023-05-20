import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


export const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    }
    catch {
      setErr(true);
      console.log(err)
    }
  }

  return (
    <div className='form'>
      <div className='form-wrapper'>
        <span className="logo"><img src="/cluster-logo.png" alt="" /></span>
        <span className="title">Giriş Yap</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Şifre' />
          <button>Giris Yap</button>
        </form>
        <p>Hesabınız yok mu? <Link to="/register">Hesap Oluşturun</Link></p>
      </div>
    </div>
  )
}
