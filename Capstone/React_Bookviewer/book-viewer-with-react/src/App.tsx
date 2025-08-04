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
       <Sidebar chapterTitles={chapterTitles} onSelect={onSelect}></Sidebar>

        <div id="main">
          <div className="header">
            <h1>The Adventures of Sherlock Holmes</h1>
            <h2>by Sir Arthur Doyle</h2>
          </div>
          {
            chapterSelected ? (
              <ChapterContent text={currentChapter} currentTitle={currentTitle} />
            ) : (
              <TOC chapterTitles={chapterTitles} onSelect={onSelect} />
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
