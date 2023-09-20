"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'; // Assuming this is a React functional component
import { getPost } from '@/redux/slices/postSlice';

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.data); // Assuming 'post' is the slice name
  console.log({posts});

  useEffect(() => {
    // Dispatch the fetchPosts action when the component mounts
    dispatch(getPost());
  }, [dispatch]);
  return <main className="">Second wallet LMS</main>;
}
