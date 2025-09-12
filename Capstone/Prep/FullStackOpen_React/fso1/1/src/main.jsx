import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import Anecdotes from './Anecdotes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <App />
    <Anecdotes/>
  </div>
)