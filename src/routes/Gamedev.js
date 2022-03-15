import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
import SmallPost from '../components/SmallPost.js'
import Settings from '../components/Settings.js'

export default function Gamedev() {
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
                <div style={{width:100+'vw', height:90+'vh', backgroundColor:'var(--bkg)'}}>
                    <h1 id="title" className="item" style={{padding:1+'vh', display:'inline-flex'}}>&gt; game development&nbsp;</h1>
                    <Settings></Settings>
                    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',paddingLeft:20+'vw',paddingRight:20+'vw'}}>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                        <SmallPost image="https://via.placeholder.com/200" title="Placeholder"></SmallPost>
                    </div>
                </div>
            </div>
        </div>
    );
}