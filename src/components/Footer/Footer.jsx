import './Footer.css'
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
const Footer = ()=>{

    return(
        <div className="footer">
            <section class="redes" id="redes">
            <div class="redes-text">
            <a href="https://www.instagram.com/tarot.sitaara/" target="_blank" rel="noopener noreferrer" className='ilogo'>
            <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@tarot.sitaara" target="_blank" rel="noopener noreferrer" className='ilogo'>
            <FaTiktok />
            </a>
           <a href='https://api.whatsapp.com/send/?phone=541123980487&text&type=phone_number&app_absent=0'><FaWhatsapp /> 11 2398-0487 solo Whatsapp</a>
        </div>
    </section>
            <p>Copyright Tarot Sitaara - 2024. Todos los derechos reservados.</p>
        </div>
    )
}

export default Footer

