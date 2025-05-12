import React, { useState } from 'react';
import './style.css';
import { Input } from '../Input';
import Button from '../Button';
import { toast } from 'react-toastify';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db, provider } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignupSigninComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false); // false = signup, true = login
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const signupWithEmail = async () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all the fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password and Confirm Password do not match');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      toast.success('User Created Successfully');
      await createDoc(user, name);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('User Logged In Successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await createDoc(user, user.displayName);
      toast.success('User Logged In Successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to log in with Google');
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDoc = async (user, nameFromInput) => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      try {
        await setDoc(userDocRef, {
          name: user.displayName || nameFromInput || 'Anonymous',
          email: user.email,
          photo: user.photoURL || null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        console.log('User document created successfully');
      } catch (error) {
        console.error('Error creating user document:', error);
        toast.error('Failed to create user document');
      }
    }
  };

  return (
    <>
      <div className='signup-wrapper'>
        <h2 className='title'>
          {loginForm ? 'Log In to' : 'Sign Up on'}{' '}
          <span style={{ color: 'var(--theme)' }}>Financely</span>
        </h2>

        <form>
          {!loginForm && (
            <Input
              // type='text'
              label='Full Name'
              state={formData.name}
              setState={value => handleChange('name', value)}
              placeholder='Globussoft'
            />
          )}
          <Input
            type='email'
            label='Email'
            state={formData.email}
            setState={value => handleChange('email', value)}
            placeholder='Globussoft@gmail.com'
          />
          <Input
            type='password'
            label='Password'
            state={formData.password}
            setState={value => handleChange('password', value)}
            placeholder='Globussoft123'
          />
          {!loginForm && (
            <Input
              type='password'
              label='Confirm Password'
              state={formData.confirmPassword}
              setState={value => handleChange('confirmPassword', value)}
              placeholder='Globussoft123'
            />
          )}

          <Button
            text={
              loading
                ? loginForm
                  ? 'Logging In...'
                  : 'Signing Up...'
                : loginForm
                  ? 'Log In Using Email and Password'
                  : 'Sign Up Using Email and Password'
            }
            onClick={loginForm ? loginWithEmail : signupWithEmail}
            disabled={loading}
          />

          <p className='or'>OR</p>

          <Button
            text={loading ? 'Please wait...' : loginForm ? 'Log In Using Google' : 'Sign Up Using Google'}
            blue={true}
            onClick={loginWithGoogle}
          />

          <p className='already'>
            {loginForm ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <span
              style={{ color: 'var(--theme)', cursor: 'pointer' }}
              onClick={() => setLoginForm(prev => !prev)}
            >
              {loginForm ? 'Sign Up' : 'Sign In'}
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignupSigninComponent;
