import MenuItemRow from './MenuItemRow.jsx'

export default function MenuCategory({ category }) {
  return (
    <tbody>
      <tr className="category-row">
        <th colSpan="2">
          {category.name} ({category.items.length})
        </th>
      </tr>
      {category.items.map((item) => (
        <MenuItemRow key={item.id} item={item} />
      ))}
    </tbody>
  )
}
