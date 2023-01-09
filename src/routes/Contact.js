import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
import Settings from '../components/Settings.js'
import { FaDiscord, FaAt, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Contact() {
    return (
        <div>
            <div style={{height:10+'vh'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:100+'%', height:9.9+'vh'}}>
                    <Link className="router-link" to="/">HOME</Link>
                    <Link className="router-link" to="/gamedev">GAMEDEV</Link>
                    <Link className="router-link" to="/contact">CONTACT</Link>
                </div>
                <div style={{backgroundColor:'var(--basic)', width:100+'%', height:.1+'vh', minHeight:1+'px'}}></div>
            </div>
            <div style={{display:'flex'}}>
                <div style={{position:"absolute", width:"100%", display:"flex", marginTop:"54px", right:"54px", whiteSpace:"nowrap", justifyContent:"flex-end"}}>
                    <Settings></Settings>
                </div>
                <div style={{width:100+'vw', height:90+'vh', backgroundColor:'var(--bkg)'}}>
                    <h1 id="title" className="item" style={{padding:1+'vh', display:'inline-flex'}}>&gt; contact&nbsp;</h1>
                    <div style={{margin:"24px"}}>
                        <p>Looking to collaborate? Let's chat.</p>
                        <br />
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <div style={{display:"inline-flex"}}>
                                <FaAt style={{width:"18px", height:"18px"}}/>&nbsp;<a href="mailTo:vanessa.chu@mail.mcgill.ca">vanessa.chu@mail.mcgill.ca</a>
                            </div>
                            <br />
                            <div style={{display:"inline-flex"}}>
                                <FaLinkedin style={{width:"18px", height:"18px"}}/>&nbsp;<a href="https://www.linkedin.com/in/v-chu/" >https://www.linkedin.com/in/v-chu/</a>
                            </div>
                            <br />
                            <div style={{display:"inline-flex"}}>
                                <FaTwitter style={{width:"18px", height:"18px"}}/>&nbsp;<a href="https://twitter.com/jjustness" >@jjustness</a>
                            </div>
                            <br />
                            <div style={{display:"inline-flex"}}>
                                <FaDiscord style={{width:"18px", height:"18px"}}/>&nbsp;ness#8155
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}