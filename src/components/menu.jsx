import style from "./menu.module.css"
import { useNavigate } from "react-router"
import MenuImg from "../assets/menu.png"
import { useState } from "react"

export const Menu = () =>{
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)


const goToDashboard = () => navigate('/dashboard')
const goToUsers = () => navigate('/userList')

const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
}

    return(
        <nav className={open ?  style.navBar : style.navBarClosed}>
            <img src={MenuImg} alt="Menu icon" width={30} height={30} onClick={() => setOpen(prev => !prev)}/>
            <p onClick={goToDashboard}>Dashoard</p>
            <p>Criar usuario</p>
            <p onClick={goToUsers}>Lista de usuarios</p>
            <p>Criar produtos</p>
            <p>Lista de produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>
    )
}
