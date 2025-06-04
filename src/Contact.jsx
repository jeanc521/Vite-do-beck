import { useState } from "react";
import style from "./Contact.module.css"

function Contact(){
    const defaultNumber = "999999999"
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})

    }

    const handleZap =  () => {
        const {name, email, password} = formData
        const message  = `Name: ${name}%0AEmail: ${email}%0AMessage: ${password}`
        const URLzap = `https://api.whatsapp.com/send?phone=${defaultNumber}&text=${message}`

        window.open(URLzap, "_blank")
    }

    return(
        <>
        <section className={style.wrapCont}>
            <input  type="name" placeholder="Digite seu nome" id="name" name="name" value={formData.name} onChange={handleChange} required/>
            <input  type="email" placeholder="Digite seu email" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            <textarea  placeholder="Digite sua senha" name="password" id="password" value={formData.password} onChange={handleChange} required></textarea>
            <button  onClick={handleZap}>Enviar cadastro</button>
        </section>
        </>
    )
}

export default Contact