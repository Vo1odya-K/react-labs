import { useState } from 'react'
/**
 * Показує перші `step` елементів з `items` і кнопку, що показує наступні.
 *
 * Використання:
 *   <ShowMore items={reviews} step={3}>
 *     {(visibleItems) => <ul>…</ul>}
 *   </ShowMore>
 *
 * Вимоги — у тестах tests/ShowMore.test.jsx.
 */
export default function ShowMore({ items, step = 3, children }) {
  const [visibleCount, setVisibleCount] = useState(step)

  const visibleItems = items.slice(0, visibleCount)
  const hiddenCount = Math.max(0, items.length - visibleCount)
  const hasToggle = items.length > step
  const isExpanded = hiddenCount === 0
  const nextBatch = Math.min(step, hiddenCount)

  function handleToggle() {
    if (isExpanded) {
      setVisibleCount(step)
    } else {
      setVisibleCount((prev) => Math.min(prev + step, items.length))
    }
  }

  return (
    <>
      {children(visibleItems)}
      {hasToggle && (
        <button type="button" className="show-more" onClick={handleToggle}>
          {isExpanded ? 'Згорнути' : `Показати ще ${nextBatch}`}
        </button>
      )}
    </>
  )
}
