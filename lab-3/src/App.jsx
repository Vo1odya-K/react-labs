import { menu } from './data.js'
// import MenuItemRow from './components/MenuItemRow.jsx'
// import MenuCategory from './components/MenuCategory.jsx'
import MenuTable from './components/MenuTable.jsx'

export default function App() {
  return (
    <main className="app">
      <h1>Меню кав'ярні</h1>

      <search className="search-bar">
        <input
          type="search"
          placeholder="Пошук у меню"
          aria-label="Пошук у меню"
        />
        <label>
          <input type="checkbox" /> Лише в наявності
        </label>
      </search>

      <table className="menu-table">
        <MenuTable menu={menu} />
      </table>
    </main>
  )
}
