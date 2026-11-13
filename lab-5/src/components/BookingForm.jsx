import GuestsStepper from './GuestsStepper.jsx'
import { useRef, useState } from 'react'
import { describeBooking } from '../describeBooking.js'

export default function BookingForm() {
  const [booking, setBooking] = useState(null)
  const [comment, setComment] = useState('')
  const nameRef = useRef(null)
  const [guests, setGuests] = useState(2)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setBooking(Object.fromEntries(formData))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.currentTarget.requestSubmit()
    }
  }

  function handleReset() {
    setBooking(null)
    setComment('')
    setGuests(2)
    nameRef.current.focus()
  }
  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      onReset={handleReset}
    >
      <label>
        Ім'я
        <input
          ref={nameRef}
          type="text"
          name="name"
          autoComplete="name"
          required
        />
      </label>
      <div className="row">
        <label>
          Дата
          <input type="date" name="date" required />
        </label>
        <label>
          Час
          <input type="time" name="time" required />
        </label>
      </div>
      <GuestsStepper value={guests} onChange={setGuests} />
      <label>
        Коментар
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
          maxLength={200}
          aria-describedby="comment-counter"
        />
      </label>
      <p id="comment-counter" className="counter">
        {comment.length} / 200
      </p>
      <div className="actions">
        <button type="submit">Забронювати</button>
        <button type="reset">Очистити</button>
      </div>
      <p role="status" className="status">
        {booking && describeBooking(booking)}
      </p>
    </form>
  )
}
