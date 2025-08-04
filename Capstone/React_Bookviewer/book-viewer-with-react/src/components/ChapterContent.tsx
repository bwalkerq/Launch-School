const ChapterContent = ({text}: {text: string}) => {
  return (
    <div className="content">
      <h2 className="content-subhead">insert chapter title here</h2>
      <div>
        {text.split(/\n{2,}/).map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  )
}
export default ChapterContent;