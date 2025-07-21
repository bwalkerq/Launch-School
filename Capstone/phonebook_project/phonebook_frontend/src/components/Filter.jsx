// Filter.js
const Filter = ({ filterValue, onFilterChange }) => (
  <div>
    filter shown with{' '}
    <input
      value={filterValue}
      onChange={e => onFilterChange(e.target.value)}
      placeholder="Search names..."
    />
  </div>
)

export default Filter
