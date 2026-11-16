import { useEffect, useState } from 'react'
import './App.css'
import type { User } from './type/types'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [nev, setNev] = useState("");
  const [osztaly, setOsztaly] = useState("");
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
  async function felhasznaloFelvetel(e) {
    e.preventDefault();
    const ujFelhasznalo = {
      nev,
      osztaly
    }
    try {
      const response = await fetch("http://localhost:3000/users", {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(ujFelhasznalo)
      });
      if (!response.ok) {
        throw new Error("Hiba az adatfelvételnél");
      }
      const felhasznalo = await response.json() as User;
      setUsers((elozo) => [...elozo, felhasznalo]);
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
    finally {
      setNev("");
      setOsztaly("");
    }

    console.log(ujFelhasznalo)
  }
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
        <h2>Felhasználó felvétel</h2>
        <form onSubmit={felhasznaloFelvetel}>
          <label htmlFor="nev" className="form-label">Név</label>
          <input type="text" name='nev' className='form-control' value={nev} onChange={(e) => setNev(e.target.value)}/>
          <label htmlFor="osztaly" className='form-label'>Osztály</label>
          <input type="text" name='osztaly' className='form-control mb-3' value={osztaly} onChange={(e) => setOsztaly(e.target.value)}/>
          <button type="submit" className='btn btn-primary' >Felvétel</button>
        </form>
      </div>
    </>
  )
}

export default App
