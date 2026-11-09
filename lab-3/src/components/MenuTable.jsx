import MenuCategory from './MenuCategory.jsx'

export default function MenuTable({ menu }) {
  return (
    <table className="menu-table">
      <thead>
        <tr>
          <th scope="col">позиція</th>
          <th scope="col">ціна</th>
        </tr>
      </thead>
      {menu.map((category) => (
        <MenuCategory key={category.id} category={category} />
      ))}
    </table>
  )
}
