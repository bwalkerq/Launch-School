import {useEffect, useState} from 'react'
import './assets/book_viewer.css'
import axios from 'axios'
import TOC from "./components/TOC.tsx";
import ChapterContent from "./components/ChapterContent.tsx";
import Sidebar from "./components/Sidebar.tsx";

const baseUrl = '/api'

function App() {
  const [chapterTitles, setChapterTitles] = useState<Array<string>>([])
  const [currentChapter, setCurrentChapter] = useState<string>('')
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [chapterSelected, setChapterSelected] = useState<boolean>(false)

  const onSelect = async (chapterTitle: string) => {
    setChapterSelected(true);
    setCurrentTitle(chapterTitle);
    try {
      const formattedTitle = chapterTitle.toLowerCase().replace(/\s+/g, '-');
      const response = await axios.get(`${baseUrl}/${formattedTitle}`);
      const chapterText = response.data;
      setCurrentChapter(chapterText);

    } catch (error) {
      console.error('Error fetching chapter text:', error);
    }
  };

  useEffect(() => {
    const fetchChapterTitles = async () => {
      try {
        const response = await axios.get(`${baseUrl}/toc`);
        const data = response.data;
        console.log('data', data)
        setChapterTitles(data.chapters);
      } catch (error) {
        console.error('Error fetching table of contents:', error);
      }
    };

    fetchChapterTitles();
  }, []);

  return (
    <>
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="/React_Bookviewer/book-viewer-with-react/public">Table of
              Contents</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Chapter 1</a>
              </li>
            </ul>
          </div>
        </div>

        {chapterSelected ? <ChapterContent text={currentChapter}></ChapterContent> : <TOC chapterTitles={chapterTitles} onSelect={onSelect}></TOC>}

        <div id="main">
          <div className="header">
            <h1>The Adventures of Sherlock Holmes</h1>
            <h2>by Sir Arthur Doyle</h2>
          </div>
          {chapterSelected ? <ChapterContent text={currentChapter} currentTitle={currentTitle}></ChapterContent> : <TOC chapterTitles={chapterTitles} onSelect={onSelect}></TOC>}
        </div>
      </div>
    </>
  )
}

export default App
