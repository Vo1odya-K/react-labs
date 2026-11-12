export default function SearchBar({ filterText, inStockOnly }) {
  return (
    <search className="search-bar">
      <input
        type="search"
        placeholder="Пошук у меню"
        aria-label="Пошук у меню"
        value={filterText}
        readOnly
      />
      <label>
        <input type="checkbox" checked={inStockOnly} readOnly /> Лише в
        наявності
      </label>
    </search>
  )
}
