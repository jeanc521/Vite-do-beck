import { useEffect, useState } from 'react'
import style from './App.module.css'
import { apiExpress } from './api/api'
import { useNavigate } from 'react-router'
import Contact from  "./Contact"

import Icon from "./assets/icons8-usuário-homem-com-círculo.gif"
import Email from "./assets/icons8-enviar.gif"
import Eye from "./assets/icons8-visível.gif"

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
const [/*user*/, setUser] = useState(null)
const [message, setMessage] = useState('')
const [showPassword, setShowPassword] = useState(false)

useEffect(() => {
  const stouredUser = localStorage.getItem('user')
  if(stouredUser){
    setUser(JSON.parse(stouredUser))
    navigate('/dashboard')
  }
}, [navigate])

const handleLogin = async(e) => {
  e.preventDefault()
  try{
    const response = await apiExpress.post('/login', {email, password})
    const user = response.data

  
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    navigate('/dashboard')
  }catch (error){
      setMessage('Error no login ' + (error.response?.data?.message || "Verifique os dados"))
  }
}

const handleContactClick = () => {
  navigate('/contact')
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
    <div className={style.wrapLogin}>

    
    <div className={style.wrapImg}>
    <div className={style.degrade}></div>
    </div>
  <div className={style.wrapForm}>
    <form onSubmit={handleLogin}>
      <div>
  <img className={style.iconMenu} src={Icon} alt="Icon login" />
    <h2>Login</h2>
      </div>
    <div style={{position: 'relative', width: '100%'}}>
      <input type="email" placeholder='Digite o email' value={email} onChange={(e) => setEmail(e.target.value)} required  />
      <img className={style.icon} src={Email} alt="Caixa de email" />
    </div>
    <div style={{position: 'relative', width: '100%'}}> 
    <input type={showPassword ? 'text' : 'password'} placeholder='Digite a senha' value={password} onChange={(e) => setPassword(e.target.value)} required/>
    <img onClick={() => setShowPassword(prev => !prev)} style={{position: "absolute", width: '20px', borderRadius: '100%', right: '10px', top: '10px', cursor: 'pointer'}} className={style.icon} src={Eye} alt="Olho da senha" />
    </div>
    <button type='submit'>ENTRAR</button>
    <button  onClick={handleContactClick}>Entrar em contato</button>
    <p>{message}</p>
    </form>
  </div>
  </div>
    </>
  )
}

export default App
