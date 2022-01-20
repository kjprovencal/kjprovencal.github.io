import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Albums from './routes/Albums';
import Album from './routes/Album';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/albums" element={<Albums />}>
        <Route path=":albumTitle" element={<Album />} />
      </Route>
      </Routes>
      </BrowserRouter>,
      document.getElementById('root')
    );
registerServiceWorker();
