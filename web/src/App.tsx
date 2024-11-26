import { useEffect, useState } from 'react'
import { listUsers, type ListUsers200Item } from './http/generated/api'

function App() {
  const [users, setUsers] = useState<ListUsers200Item[]>([])

  useEffect(() => {
    listUsers().then(users => {
      setUsers(users.data)
    })
  })

  return (
    <>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>{user.name}</li>
          )
        })}
      </ul>
    </>
  )
}

export default App
