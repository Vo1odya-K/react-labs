import { useShowMore } from '../hooks/useShowMore.js'
import FavoriteButton from './FavoriteButton.jsx'

export default function RelatedProducts({ products }) {
  const step = 4
  const { visibleItems, hiddenCount, showMore, collapse } = useShowMore(
    products,
    step,
  )
  const hasToggle = products.length > step
  const isExpanded = hiddenCount === 0
  const nextBatch = Math.min(step, hiddenCount)

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title">Схожі товари</h2>
      <ul className="related-list" aria-labelledby="related-title">
        {visibleItems.map((item) => (
          <li key={item.id} className="related-card">
            <h3>{item.name}</h3>
            <p>{item.notes}</p>
            <p className="price">{item.price} грн</p>
            <FavoriteButton productId={item.id} name={item.name} />
          </li>
        ))}
        {hasToggle && (
          <li className="related-more">
            <button
              type="button"
              className="show-more"
              onClick={isExpanded ? collapse : showMore}
            >
              {isExpanded ? 'Згорнути' : `Показати ще ${nextBatch}`}
            </button>
          </li>
        )}
      </ul>
    </section>
  )
}
