import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
import Settings from '../components/Settings.js'

export default function _TEMPLATE() {
    return (
        <div>
            <div style={{height:10+'vh'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:100+'%', height:9.9+'vh'}}>
                    <Link className="router-link" to="/">HOME</Link>
                    <Link className="router-link" to="/gamedev">GAMEDEV</Link>
                    <Link className="router-link" to="/design">_TEMPLATE</Link>
                </div>
                <div style={{backgroundColor:'var(--basic)', width:100+'%', height:.1+'vh', minHeight:1+'px'}}></div>
            </div>
            <div style={{display:'flex'}}>
                <div style={{width:100+'vw', height:90+'vh', backgroundColor:'var(--bkg)'}}>
                    <h1 id="title" className="item" style={{padding:1+'vh', display:'inline-flex'}}>&gt; _TEMPLATE&nbsp;</h1>
                    <div style={{position:"absolute", width:"100%", display:"flex", marginTop:"16px", right:"54px", whiteSpace:"nowrap", justifyContent:"flex-end"}}>
                        <Settings></Settings>
                    </div>
                </div>
            </div>
        </div>
    );
}