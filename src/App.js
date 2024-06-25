import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import store from './redux/store.js'; 
import Navbar from './components/Navbar.jsx'; 
import Title from './components/Title.jsx'; 
import About from './components/About.jsx'; 
import Link from './components/Link.jsx'; 
import Footer from './components/Footer.jsx'; 
import News from './pages/News.jsx'; 
import Contact from './pages/Contact.js'; 
import FactTool from './pages/Resources/FactTool.jsx'; 
import Login from './pages/Login/Login.jsx'; 
import { Registration } from './pages/Registration/Registration.jsx';
import FullPost from './pages/FullPost.jsx'; 
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.js';
import { AddPost } from './pages/AddPost/index.jsx';


const AppContent = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth); // eslint-disable-line no-unused-vars

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Title />
            <About />
            <Link />
          </>
        } />
        <Route path="/Resources/FactTool" element={<FactTool />} />
        <Route path="/News" element={<News />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/posts/:id" element={<FullPost />} />
        <Route path="/posts/:id/edit" element={<AddPost />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
