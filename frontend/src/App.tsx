import { ErrorInfo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [header, setHeader] = useState<string | null>(null)

  const getHeader = async () => {
    try {
      const res = await fetch('http://localhost:3000')
      const text = await res.text()

      setHeader(text)
    } catch (error) {
      setHeader('Что-то пошло не так!')
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{header}</h1>
      <div className="card">
        <button onClick={() => getHeader()}>
          get header
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
