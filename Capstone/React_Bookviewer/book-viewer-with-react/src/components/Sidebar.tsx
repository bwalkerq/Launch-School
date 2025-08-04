import ChapterLink from "./ChapterLink.tsx";

interface SidebarProps {chapterTitles: string[], onSelect: (chapterTitle: string) => void}

const Sidebar = ({chapterTitles, onSelect}: SidebarProps) => {
  return (
    <div id="menu">
      <div className="pure-menu">
        <a className="pure-menu-heading" href="/React_Bookviewer/book-viewer-with-react/public">Table of
          Contents</a>

        <ul className="pure-menu-list">
          <li className="pure-menu-item">
            {chapterTitles.map(chapterTitle => {
              return <ChapterLink chapterTitle={chapterTitle} key={chapterTitle} onSelect={onSelect} />
            })}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;