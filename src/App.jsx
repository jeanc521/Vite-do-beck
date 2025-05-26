import { useEffect, useState } from 'react'
import './App.module.css'
import { apiExpress } from './api/api'
import { useNavigate } from 'react-router'


function App() {
  
//  const [data, setData] = useState([])
//  const [data2, setData2] = useState([])
//  const [dataultimo, setDataultimo] = useState([])

// useEffect(() => {
//   apiExpress.get('/').then((res) => {
//     setData(res.data)
//   })
// },[])

// useEffect(() => {
//   apiExpress.get("/funcionarios").then((res) => {
//     setData2(res.data.items)
//   })
// },[])

// useEffect(() => {
//   apiExpress.get("/images").then((res) => {
//     setDataultimo(res.data.results)
//   })
// })

const navigate = useNavigate();

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)
const [message, setMessage] = useState('')

useEffect(() => {
  const stouredUser = localStorage.getItem('user')
  if(stouredUser){
    setUser(JSON.parse(stouredUser))
    navigate('/usersList')
  }
}, [navigate])

const handleLogin = async(e) => {
  e.preventDefault()
  try{
    const response = await apiExpress.post('/login', {email, password})
    const user = response.data
    console.log(response.data)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    navigate('/usersList')
  }catch (error){
      setMessage('Error no login ' + (error.response?.data?.message || "Verifique os dados"))
  }
}



  return (
    <>
    {/* {data}
  <br />
    <h1>{data2}</h1>
    {data2.map((item) => {
      return(
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.idade}</p>
          <p>{item.cargo}</p>
          <p>{item.custoPorHora}</p>
          <p>{item.temLicenca ? "Tem permissão 😊" : "Sem permissão 🤬"}</p>
        </div>
      )
    })}
    <h1>{dataultimo}</h1>
    {dataultimo.map((item) => {
      return(
        <div key={item.id}>
          <p>{item.name}</p>
          <img src={item.image} alt={item.name} />
        </div>
      )
    })} */}
  <div style={{padding: '2rem'}}>
    <form onSubmit={handleLogin}>
    <h2>Login</h2>
    <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required  />
    <input type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    <button type='submit'>ENTRAR</button>
    <p>{message}</p>
    </form>
  </div>
    </>
  )
}

export default App
