import React from 'react';
import AddAvatar from '../img/addavatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase'
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          setErr(true)
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {})
            navigate('/')

          });
        }
      );
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
        <span className="title">Kaydol</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Nickname' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Şifre' />
          <input type="file" id='file' />
          <label htmlFor="file">
            <img src={AddAvatar} alt="" />
            <span>Avatar Ekleyiniz.</span>
          </label>
          <button>Kaydol</button>
          {err && <span>Bir şeyler yanlış gitti.</span>}
        </form>
        <p>Hesabınız var mı? <Link to="/login">Giriş Yapın</Link></p>
      </div>
    </div>
  )
}
