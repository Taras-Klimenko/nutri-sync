import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Knowledge from './pages/Knowledge';

function App() {
  return (
    <>
      <Routes>
        <Route path="/knowledge" element={<Knowledge />} />
      </Routes>
    </>
  );
}

export default App;
