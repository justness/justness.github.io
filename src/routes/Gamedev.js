import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
import BigPost from '../components/BigPost.js'
import Antimony from '../images/gamedev/antimony.png'
import BadtimeStories from '../images/gamedev/badtimestories.png'
import Icarus from '../images/gamedev/icarus.png'
import KeptSafe from '../images/gamedev/keptsafe.png'
import LateNight from '../images/gamedev/latenight.png'
import Shelter from '../images/gamedev/shelter.png'

export default function Gamedev() {
    return (
        <div>
            <div style={{height:10+'vh'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:100+'%', height:9.9+'vh'}}>
                    <Link className="router-link" to="/">HOME</Link>
                    <Link style={{backgroundColor:"var(--basic)", color:"var(--bkg)"}} className="router-link" to="/gamedev">GAMEDEV</Link>
                    <Link className="router-link" to="/contact">CONTACT</Link>
                </div>
                <div style={{backgroundColor:'var(--basic)', width:100+'%', height:.1+'vh', minHeight:1+'px'}}></div>
            </div>
            <div style={{display:'flex'}}>
                <div style={{width:100+'vw', height:90+'vh', backgroundColor:'var(--bkg)', overflowY:"scroll"}}>
                    <h1 id="title" className="item" style={{padding:1+'vh', display:'inline-flex'}}>&gt; game development&nbsp;</h1>
                    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',paddingLeft:4+'vw',paddingRight:5+'vw'}}>
                        <BigPost 
                            image={Icarus} 
                            title="Icarus (2022)" 
                            content="3D First-person dash-chaining melee combat game. Created on a team of 3 at an informal game jam for the theme 'Live fast, die strong'." 
                            link="https://omch.itch.io/icarus">
                        </BigPost>
                        <BigPost 
                            image={LateNight} 
                            title="Late Night (2021)" 
                            content="2D point-and-click adventure/puzzle game. Created solo at an informal game jam for the theme 'Noir'." 
                            link="https://justness.itch.io/late-night">
                        </BigPost>
                        <BigPost 
                            image={Shelter} 
                            title="Shelter (2021)" 
                            content="3D Sandbox resource-management game. Created solo at GDM's March 2021 Monthly Game Jam for the theme 'Shelter'." 
                            link="https://justness.itch.io/shelter">
                        </BigPost>
                        <BigPost 
                            image={BadtimeStories} 
                            title="Badtime Stories (2020)" 
                            content="3D co-op action game. Created on a team of 6 at Ubisoft's 2020 Game Lab Competition for the theme 'Generation'." 
                            link="https://green-tea.itch.io/antimony">
                        </BigPost>
                        <BigPost 
                            image={Antimony} 
                            title="Antimony (2020)" 
                            content="2.5D isometric horror/puzzle game. Created on a team of 6 at Global Game Jam 2020 for the theme 'Repair'." 
                            link="https://green-tea.itch.io/antimony">
                        </BigPost>
                        <BigPost 
                            image={KeptSafe} 
                            title="Kept Safe (2019)" 
                            content="2D narrative game. Created on a team of 6 at Global Game Jam 2019 for the theme 'What home means to you'." 
                            link="https://vassen.itch.io/kept-safe">
                        </BigPost>
                    </div>
                </div>
            </div>
        </div>
    );
}