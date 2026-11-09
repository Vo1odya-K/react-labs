export default function SearchBar() {
  return (
    <search className="search-bar">
      <input type="text" placeholder="Пошук у меню" readOnly />
      <label>
        <input type="checkbox" /> Лише в наявності
      </label>
    </search>
  )
}
