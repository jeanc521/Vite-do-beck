import './usersList.module.css'

import { useState, useEffect, } from 'react'
import { apiExpress } from './api/api'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'

function UsersList() {
const navigate = useNavigate()
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")
const [editUserid, setEdituserid] = useState(null)
const [editData, setEditData] = useState({name: '', email: '', password: ''})

useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(!storedUser) navigate('/')
},[navigate])


    const fetchUsers = async () => {
        try{
            const res =  await apiExpress.get('/user')
            setUsers(res.data)
        }catch (err){
            setError("Erro ao carregar usuarios", err)
        }finally{
            setLoading(false)
        }
    }


useEffect(() => {
    fetchUsers()
}, [])

const handleDelete = async (id) => {
    try{
        await apiExpress.delete(`/user/${id}`)
        setUsers(users.filter((u) => u.id !== id))
    }catch (err){
        setError("Erro ao deletar usuario", err)
    }
}

const handleEditClick = (user) => {
    setEdituserid(user.id)
    setEditData({name: user.name, email: user.email, password: ''}) // Não mostra a senha antiga.
}

const handleEditChange = (e) => {
    const {name, value} = e.target
    setEditData({...editData, [name]: value})
}

const handleupdate = async (e) => {
    e.preventDefault()
    try{
        await apiExpress.put(`/user/${editUserid}`,editData)
        setEdituserid(null)
    } catch (err){
        setError("Erro ao dar um update", err)
    }

}

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
            {users.map((user) => (
                <li key={user.id}>
                    {editUserid === user.id ? (
                       <form onSubmit={handleupdate} style={{display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <input type="text" name='name' value={editData.name} onChange={handleEditChange} required/>
                      <input type="email" name='email' value={editData.email} onChange={handleEditChange} required/>
                      <input type="password" name='password' value={editData.password} onChange={handleEditChange} placeholder='Insira uma nova senha' required/>
                      <button type='submit'>SALVAR</button>
                      <button type='button' onClick={() => setEdituserid(null)}>CANCELAR</button>
                        </form>
                    ) : (
                        <>
                        <strong>{user.name}</strong> - <i>{user.email}</i>
                        <div style={{display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem'}}>
                            <button onClick={() => handleEditClick(user)}>EDITAR</button>
                            <button onClick={() => handleDelete(user.id)}>DELETAR</button>
                        </div>
                        </>
                    )}
                   
                </li>
         
            ))}
        </ul>
       </div>
        </section>
    )
}

export default UsersList