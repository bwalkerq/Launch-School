interface ChapterLinkProps {chapterTitle: string, onSelect: (chapterTitle: string) => void}

const ChapterLink = ({chapterTitle, onSelect}: ChapterLinkProps) => {
  return <a className="pure-menu-link" onClick={ () => onSelect(chapterTitle)}>{chapterTitle}</a>;
}
export default ChapterLink;