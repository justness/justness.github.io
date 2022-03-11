import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router

export default function Biology() {
    return (
        <div>
            <div style={{height:10+'vh'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:100+'%', height:9.9+'vh'}}>
                    <Link className="router-link" to="/">HOME</Link>
                    <Link className="router-link" to="/gamedev">GAMEDEV</Link>
                    <Link className="router-link" to="/design">DESIGN</Link>
                    <Link className="router-link" to="/biology">BIOLOGY</Link>
                </div>
                <div style={{backgroundColor:'var(--basic)', width:100+'%', height:.1+'vh', minHeight:1+'px'}}></div>
            </div>
            <div style={{display:'flex'}}>
                <div style={{flexGrow:1, height:90+'vh', backgroundColor:'var(--bkg)'}}>

                </div>
            </div>
        </div>
    );
}