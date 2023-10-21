const options = ['select element: ', 'h1', 'h2', 'h3', 'p', 'a', 'code', 'img', 'svg']

export default function ElementSelect({ setNewElementTag }) {
  return (
    <select onChange={(e) => setNewElementTag(e.target.value)}>
      {options.map((element, index) => (
        <option key={index} value={element}>
          {element}
        </option>
      ))}
    </select>
  )
}
