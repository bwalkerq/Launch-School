import ChapterLink from "./ChapterLink.tsx";

interface TOCProps {chapterTitles: string[], onSelect: (chapterTitle: string) => void}

const TOC = ({chapterTitles, onSelect}: TOCProps) => {
  return (
    <div className="content">
      <h2 className="content-subhead">Table of Contents</h2>
      <div className="pure-menu">
        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            {chapterTitles.map(chapterTitle => {
              return <ChapterLink chapterTitle={chapterTitle} key={chapterTitle} onSelect={onSelect} />
            })}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TOC;