
import {Routes, Route} from 'react-router-dom';
import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login, TagPage} from "./pages";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  // eslint-disable-next-line
const isAuth = useSelector(selectIsAuth);

React.useEffect(()=>{
  dispatch(fetchAuthMe());
}, [dispatch]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tag/:tags" element={<TagPage />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
