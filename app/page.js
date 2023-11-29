"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; // Assuming this is a React functional component
import { getPost } from '@/redux/slices/postSlice';
import ForgetPassword from './forgetPassword/page';
import LoginScreen from './components/login/LoginScreen';

export default function Home() {


  return (<LoginScreen />)
}
