// PersonForm.js
const PersonForm = ({
                      newName,
                      newNumber,
                      onNameChange,
                      onNumberChange,
                      onSubmit
                    }) => (
  <>
    <h2>add a new person</h2>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name-input">name:</label>{' '}
        <input
          id="name-input"
          value={newName}
          placeholder="add a new name"
          onChange={e => onNameChange(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="number-input">number:</label>{' '}
        <input
          id="number-input"
          value={newNumber}
          placeholder="add a phone number"
          onChange={e => onNumberChange(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={!newName || !newNumber}>
        add
      </button>
    </form>
  </>
)

export default PersonForm
