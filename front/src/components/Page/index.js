import React from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Home from 'src/containers/Home';
import Posts from 'src/containers/Posts';
import Sports from 'src/containers/Sports';
import Post from 'src/containers/Post';
import AboutUs from 'src/components/AboutUs';
import Profile from 'src/containers/Profile';
import PostForm from 'src/containers/PostForm';
import RegisterForm from 'src/containers/RegisterForm';
import LegalNotices from 'src/components/LegalNotices';
import PostsSports from 'src/containers/PostsSports';
import PostsFiltered from 'src/containers/PostsFiltered';
import ProfileUsers from 'src/containers/ProfileUsers';
import NotFound from 'src/components/NotFound';

import './page.scss';

const Page = () => (
  <main className="page">
    <Switch>
      <Route path="/posts/:theSport/:thePlace/:theDate" exact>
        <PostsFiltered />
      </Route>
      <Route path="/post/:id" exact>
        <Post />
      </Route>
      <Route path="/posts/:sport" exact>
        <PostsSports />
      </Route>
      <Route path="/profile/:id" exact>
        <ProfileUsers />
      </Route>
      <Route path="/sports" exact>
        <Sports />
      </Route>
      <Route path="/posts" exact>
        <Posts />
      </Route>
      <Route path="/about" exact>
        <AboutUs />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route path="/add" exact>
        <PostForm />
      </Route>
      <Route path="/register" exact>
        <RegisterForm />
      </Route>
      <Route path="/legal" exact>
        <LegalNotices />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </main>
);

export default Page;
