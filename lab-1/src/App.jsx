import ProfileCard from './components/ProfileCard.jsx'

function App() {
  return (
    <main>
      <ProfileCard
        name="Вова"
        group="КН-312"
        technologies={['React', 'Vite', 'JavaScript']}
      />
    </main>
  )
}

export default App
