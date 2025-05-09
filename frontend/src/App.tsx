import {BrowserRouter , Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import { Index } from './page/index'
import { Signup } from './page/signup'
import { Signin } from './page/signin'
import { Blog } from './page/blog'
import { Article } from './page/article'
import { Profile } from './page/profile'
import { Submit } from './page/submit'
import News from './page/news'
import ISRO from './page/isro'
import About from './page/about'
import Pricing from './page/pricing'
import Features from './page/features'
import NightSkyMap from './page/night-sky-map'
import Guide from './page/guide'
import LearningPath from './page/learning-path'
import Printables from './page/printables'
import FAQs from './page/faqs'
import QuickStart from './page/quick-start'
import Documentation from './page/documentation'
import UserGuide from './page/user-guide'
import { Blogs } from './page/blogs'
import { BlogPost } from './page/blog-post'
import { CreateBlog } from './page/create-blog'

// Get the Google Client ID from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Add this console log to check if the client ID is loaded
console.log('Google Client ID:', GOOGLE_CLIENT_ID);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path='/' element={<Index/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/article/:id' element={<Article/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/isro' element={<ISRO/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/pricing' element={<Pricing/>}/>
            <Route path='/features' element={<Features/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/submit' element={<Submit/>}/>
            <Route path='/night-sky-map' element={<NightSkyMap/>}/>
            <Route path='/guide' element={<Guide/>}/>
            <Route path='/learning-path' element={<LearningPath/>}/>
            <Route path='/printables' element={<Printables/>}/>
            <Route path='/faqs' element={<FAQs/>}/>
            <Route path='/quick-start' element={<QuickStart/>}/>
            <Route path='/documentation' element={<Documentation/>}/>
            <Route path='/user-guide' element={<UserGuide/>}/>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
