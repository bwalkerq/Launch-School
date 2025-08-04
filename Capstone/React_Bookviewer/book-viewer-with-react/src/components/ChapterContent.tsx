interface ChapterContentProps {text: string, currentTitle: string}
const ChapterContent = ({text, currentTitle}: ChapterContentProps) => {
  return (
    <div className="content">
      <h2 className="content-subhead">{currentTitle}</h2>
      <div>
        {text.split(/\n{2,}/).map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  )
}
export default ChapterContent;