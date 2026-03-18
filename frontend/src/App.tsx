import { useState } from 'react';
import './App.css'
import Login from './pages/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <Login />
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
