const options = ['select element: ', 'h1', 'p', 'code', 'img']

export default function ElementSelect({ setNewElement }) {
  return (
    <select onChange={(e) => setNewElement(e.target.value)}>
      {options.map((element, index) => (
        <option key={index} value={element}>
          {element}
        </option>
      ))}
    </select>
  )
}
