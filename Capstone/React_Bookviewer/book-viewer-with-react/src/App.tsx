import { useState } from 'react'
import 'assets/book_viewer.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="layout">
        <a href="#menu" id="menuLink" class="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div class="pure-menu">
            <a class="pure-menu-heading" href="/React_Bookviewer/book-viewer-with-react/public">Table of Contents</a>

            <ul class="pure-menu-list">
              <li class="pure-menu-item">
                <a href="#" class="pure-menu-link">Chapter 1</a>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div class="header">
            <h1>The Adventures of Sherlock Holmes</h1>
            <h2>by Sir Arthur Doyle</h2>
          </div>

          <div class="content">
            <h2 class="content-subhead">Table of Contents</h2>

            <div class="pure-menu">
              <ul class="pure-menu-list">
                <li class="pure-menu-item">
                  <a href="#" class="pure-menu-link">Chapter 1</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
