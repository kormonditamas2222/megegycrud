import { useEffect, useState } from 'react'
import './App.css'
import type { User } from './type/types'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Hiba az adatok betöltésénél");
        }
        const data = await response.json() as User[];
        setUsers(data);
      }
      catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      }
    }
    load()
  }, []);
  return (
    <>
      <div className="container">
        <h1>Felhasználók</h1>
        <h2>Felhasználók listája</h2>
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th>Név</th>
              <th>Osztály</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.nev}</td>
                <td>{user.osztaly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
