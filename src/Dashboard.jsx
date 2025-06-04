import { useNavigate } from "react-router";
import style from  './Dashboard.module.css'
import { apiExpress } from "./api/api";
import { useState, useEffect } from "react";
import { Menu } from "./components/menu";
// import {contato} from "./components/contato"


function Dashboard(){
    const navigate = useNavigate()
    const [userCont, setUserCont] = useState(0)
    const [productCont, setProductCont] = useState(0)
   
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(storedUser)
        navigate('/')
    },[navigate])

    useEffect(() => {
        async function fetchData(){
            try{
                const [userRes, productRes] = await Promise.all([
                    apiExpress.get('/user'),
                    apiExpress.get('/list'),
                ])
                setUserCont(userRes.data.length)
                setProductCont(productRes.data.length)
            }catch(erro){
                console.error("Erro ao buscar  dados do Dashboard", erro)
            }
            
        }
        fetchData()
    },[])
    console.log()


    return(
        <section>
            <Menu />
            <div className={style.wrapNav}>
                <div className={style.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar produtos - ({productCont} produtos)</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate('/#')}>
                    <p>Lista de produtos</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate("/#")}>
                    <p>Criar usuarios</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate('/userList')}>
                    <p>Lista de usuarios - ({userCont} usuarios)</p>
                </div>
                <div className={style.wrapItem} onClick={() => navigate('./components/contato.jsx')}>
                    <p>Meio de contato - ({userCont} contato)</p>
                </div>
            </div>
        </section>
    )
}

export default Dashboard