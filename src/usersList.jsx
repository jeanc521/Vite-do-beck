import './usersList.module.css'

import { useState,useEffect } from 'react'
import { apiExpress } from './api/api'
import { Menu } from './components/menu'


function UsersList() {
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")

useEffect(() => {
   async function fetcUsers(){
    try{
        const response = await apiExpress.get("/user")
        setUsers(response.data)
        console.log(response.data)
    }catch (error) {
        setError("Error ao carregar usuarios", error)
    }finally{
        setLoading(false)
    }
   } 
   fetcUsers()
},[])
    if(loading) return <p>Carregando usuarios...</p>
    if(error) return <p>{error}</p>


    return(
        <section>
            <Menu />
       <div style={{padding: '2rem'}}>
        <h1>lista de usuarios</h1>
        <ul>
            {users.map((item) => (
                <li key={item.id}>
                    <strong>{item.name}</strong> - <i>{item.email}</i>
                </li>
            )
            )}
        </ul>
       </div>
        </section>
    )
}

export default UsersList