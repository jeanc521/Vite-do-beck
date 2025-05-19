import { useEffect, useState } from 'react'
import './App.module.css'
import { apiExpress } from './api/api'

function App() {
 const [data, setData] = useState([])
 const [data2, setData2] = useState([])
 const [dataultimo, setDataultimo] = useState([])

useEffect(() => {
  apiExpress.get('/').then((res) => {
    setData(res.data)
  })
},[])

useEffect(() => {
  apiExpress.get("/funcionarios").then((res) => {
    setData2(res.data.items)
  })
},[])

useEffect(() => {
  apiExpress.get("/images").then((res) => {
    setDataultimo(res.data.results)
  })
})


  return (
    <>
    {data}
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
    })}
    </>
  )
}

export default App
