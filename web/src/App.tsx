import CreateUser from './CreateUser'
import { useListUsers } from './http/generated/users/users'

function App() {
  const { data: users } = useListUsers()

  return (
    <>
      <ul>
        {users?.data.map(user => {
          return (
            <li key={user.id}>{user.name}</li>
          )
        })}
      </ul>

      <CreateUser />
    </>
  )
}

export default App
