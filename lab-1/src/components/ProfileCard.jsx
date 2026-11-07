import { useState } from 'react'
import './ProfileCard.css'

function ProfileCard({ name, group, technologies }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="profile-card">
      <h1>Про мене</h1>
      <p className="profile-card__detail">
        <strong>Ім’я:</strong> {name}
      </p>
      <p className="profile-card__detail">
        <strong>Група:</strong> {group}
      </p>
      <section className="profile-card__technologies">
        <h2>Технології, які хочу опанувати</h2>
        <ul>
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>
      <button
        className="profile-card__like-button"
        type="button"
        onClick={() => setLikes((count) => count + 1)}
      >
        Подобається <span aria-live="polite">{likes}</span>
      </button>
    </article>
  )
}

export default ProfileCard
