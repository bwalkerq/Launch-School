import ChapterLink from "./ChapterLink.tsx";

interface TOCProps {chapterTitles: string[], onSelect: (chapterTitle: string) => void}

const TOC = ({chapterTitles, onSelect}: TOCProps) => {
  return (
    <ul className="pure-menu-list">
      <li className="pure-menu-item">
        {chapterTitles.map(chapterTitle => {
          return <ChapterLink chapterTitle={chapterTitle} key={chapterTitle} onSelect={onSelect} />
        })}
      </li>
    </ul>
  )
}

export default TOC;