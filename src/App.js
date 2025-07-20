import { useRef } from 'react'
import { Link } from 'react-router-dom' // Do not remove Router
import Settings from './components/Settings.js'
import Social from './components/Social.js'
import '@polymer/paper-tooltip'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/av-icons.js'
import '@polymer/iron-icons/image-icons.js'
import './style.css'
import emailLogo from './images/logos/email.png'
import githubLogo from './images/logos/github.png'
import itchLogo from './images/logos/itchio.png'
import linkedinLogo from './images/logos/linkedin.png'
import twitterLogo from './images/logos/twitter.png'
import { MdWork, MdSmartToy } from "react-icons/md"
import { IoSchool } from "react-icons/io5"

export default function App() {
    const workHolder = useRef();
    const educationHolder = useRef();
    const hobbiesHolder = useRef();

    const toggleSidebar = (element) => { // TODO: Generalize this function.
        if (element.style.width === "480px"){
            element.style.width = "0";
        }
        else {
            element.style.width = "480px";
        }
    }

    return (
        <div>
            <div style={{height:10+'vh'}}>
								<div style={{display:'flex', alignItems:'center', justifyContent:'center', width:100+'%', height:9.9+'vh'}}>
										<Link style={{backgroundColor:"var(--basic)", color:"var(--bkg)"}} className="router-link" to="/">HOME</Link>
										<Link className="router-link" to="/gamedev">GAMEDEV</Link>
										<Link className="router-link" to="/contact">CONTACT</Link>
								</div>
							<div style={{backgroundColor:'var(--basic)', width:100+'%', height:.1+'vh', minHeight:1+'px'}}></div>
            </div>
            <div>
                <div style={{display:'flex'}}>
                    <div className="resume-holder" ref={workHolder} style={{overflowX:'hidden', overflowY:'scroll'}}>
                        <div className="resume-contents">
                            <div style={{textWrap:'wrap'}}>
                                <h3 style={{filter:"invert(1)"}}>
                                    Macro
                                </h3>
                                <h4 style={{margin:0, filter:"invert(1)"}}>
                                    2022-present                
                                </h4>
                                <p style={{margin:0}}>
                                    Software Engineer
                                </p>
                                <div style={{textWrap:"wrap"}}>
                                    <p>
                                        • Expanded functionality of DOCX and PDF comparison algorithm in <b>C#</b> and conducted tests in <b>Playwright</b> and <b>Go</b> to address requests from major investors <br/>
                                        • Implemented creation, modification, and saving of annotations such as highlights, strikeouts, underlines, shapes, and text boxes for PDF viewer using <b>Typescript</b>, <b>React</b>, and <b>PDF.js</b> <br/>
                                        • Improved <b>NLP error detection</b> in PDF viewer by reducing the average rate of over-reporting by up to 51%, and introduced reporting for two new categories (undefined and uncapitalized terms) <br/>
                                        • Designed and implemented new home page using <b>Typescript</b>, <b>React</b>, and <b>Tailwind CSS</b>, enabling starring, filtering, and removal of recent files, improving <b>UX</b> and streamlining the demo process for marketing team
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h3 style={{filter:"invert(1)"}}>
                                    Ubisoft Montreal
                                </h3>
                                <h4 style={{margin:0, filter:"invert(1)"}}>
                                    2021                            
                                </h4>
                                <p style={{margin:0}}>
                                    Tools Programming Intern
                                </p>
                                <div style={{textWrap:"wrap"}}>
                                    <p>
                                        • Designed and integrated reusable <b>LitElement</b> components. <br/>
                                        • Followed <b>performance</b> best practices when developing, such as asynchronous coding and reducing the volume of server calls. <br/>
                                        • Created <b>customizable JSON</b> configuration to generate HTML content from existing components. <br/>
                                        • Used and debugged <b>Docker</b> containers to locally test applications. <br />
                                        • Resolved <b>JIRA</b> issues in <b>Agile sprints</b> to address user requests and meet bi-weekly deadlines.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resume-holder" ref={educationHolder} style={{overflowX:'hidden', overflowY:'scroll'}}>
                        <div className="resume-contents">
                            <div style={{textWrap:'wrap'}}>
                                <h3 style={{filter:"invert(1)"}}>
                                    McGill University
                                </h3>
                                <h4 style={{margin:0, filter:"invert(1)"}}>
                                    2018-2022                       
                                </h4>
                                <p style={{margin:0}}>
                                    B.Sc. Computer Science/Biology Joint Major
                                </p>
                            </div>
                            <div>
                                <h3 style={{filter:"invert(1)"}}>
                                    Google
                                </h3>
                                <h4 style={{margin:0, filter:"invert(1)"}}>
                                    2020                      
                                </h4>
                                <p style={{margin:0}}>
                                    Google SPS Participant
                                </p>
                            </div>
                            <br/>
                            <div>
                                <h4 style={{filter:"invert(1)"}}>
                                    C# <br/>
                                    Java <br/>
                                    TypeScript <br/>
                                    English <br/>
                                    French <br/>
                                    Mandarin
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="resume-holder" ref={hobbiesHolder} style={{overflowX:'hidden', overflowY:'scroll'}}>
                        <div className="resume-contents">
                            <div style={{textWrap:'wrap'}}>
                                <h3 style={{filter:"invert(1)"}}>
                                    GOTY
                                </h3>
                                <h4 style={{margin:0, filter:"invert(1)"}}>
                                    Top 10 per year, in alphabetical order, for any reason ranging from art direction to gameplay to perceived cultural impact to personal inspiration.
                                </h4>
                                <h3 style={{filter:"invert(1)"}}>
                                    2024
                                </h3>
                                <p style={{margin:0}}>
                                    Arctic Eggs <br/>
                                    Content Warning <br/>
                                    Crow Country <br/>
                                    Home Safety Hotline <br/>
                                    Marvel Rivals <br/>
                                    Mouthwashing <br/>
                                    Pacific Drive <br/>
                                    Slitterhead <br/>
                                    Still Wakes the Deep <br/>
                                    Webfishing
                                </p>
                                <h3 style={{filter:"invert(1)"}}>
                                    2023
                                </h3>
                                <p style={{margin:0}}>
                                    Amnesia: The Bunker <br/>
                                    Baldur's Gate 3 <br/>
                                    Chants of Sennaar <br/>
                                    Dredge <br/>
                                    Dress to Impress <br/>
                                    Killer Frequency <br/>
                                    MyHouse.wad <br/>
                                    Slay the Princess <br/>
                                    A Space for the Unbound <br/>
                                    Stray Gods: The Roleplaying Musical <br/>
                                </p>
                                <h3 style={{filter:"invert(1)"}}>
                                    2022
                                </h3>
                                <p style={{margin:0}}>
                                    Among Us VR <br/>
                                    The Case of the Golden Idol <br/>
                                    Dorfromantik <br/>
                                    He Fucked the Girl Out of Me <br/>
                                    How Fish is Made <br/>
                                    Iron Lung <br/>
                                    Pentiment <br/>
                                    Signalis <br/>
                                    Teardown <br/>
                                    Vampire Survivors <br/>
                                </p>
                                <h3 style={{filter:"invert(1)"}}>
                                    2021
                                </h3>
                                <p style={{margin:0}}>
                                    Eastward <br/>
                                    Inscryption <br/>
                                    It Takes Two <br/>
                                    Loop Hero <br/>
                                    Mundaun <br/>
                                    Resident Evil Village <br/>
                                    Sable <br/>
                                    Space Warlord Organ Trading Simulator <br/>
                                    Super Auto Pets <br/>
                                    Toem <br/>
                                </p>
                                <h3 style={{filter:"invert(1)"}}>
                                    2020
                                </h3>
                                <p style={{margin:0}}>
                                    BPM: Bullets Per Minute <br/>
                                    Carrion <br/>
                                    Deep Rock Galactic <br/>
                                    Doom Eternal <br/>
                                    Factorio <br/>
                                    Hades <br/>
                                    In Other Waters <br/>
                                    Kentucky Route Zero <br/>
                                    Noita <br/>
                                    Omori <br/>
                                </p>
                                <h3 style={{filter:"invert(1)"}}>
                                    2019
                                </h3>
                                <p style={{margin:0}}>
                                    Beat Saber <br/>
                                    Devil May Cry 5 <br/>
                                    Disco Elysium <br/>
                                    Don't Escape: 4 Days to Survive <br/>
                                    Hypnospace Outlaw <br/>
                                    Jump King <br/>
                                    Manifold Garden <br/>
                                    No Players Online <br/>
                                    Sekiro: Shadows Die Twice <br/>
                                    Slay the Spire <br/>
                                </p>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div style={{flexGrow:1, height:90+'vh', backgroundColor:'var(--bkg)', overflowY:"scroll"}}>
                        <div style={{display:"flex"}}>
                            <h1 id="title" className="item" style={{fontSize:"100px", display:'inline-flex', wordBreak:"break-all", lineHeight:"100px", marginTop:"54px", marginLeft:"54px"}}>ness chu</h1>
                            <div style={{position:"absolute", width:"100%", display:"flex", marginTop:"54px", right:"54px", whiteSpace:"nowrap", justifyContent:"flex-end"}}>
                                <Settings></Settings>
                            </div>
                        </div>
                        <div style={{display:"inline-flex"}}>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <button className="side-tab" onClick={() => {toggleSidebar(workHolder.current)}}><div style={{width:2+'vh', bottom:2+'vh'}}></div><MdWork></MdWork></button>
                                <button className="side-tab" onClick={() => {toggleSidebar(educationHolder.current)}}><div style={{width:2+'vh', bottom:2+'vh'}}></div><IoSchool></IoSchool></button>
                                <button className="side-tab" onClick={() => {toggleSidebar(hobbiesHolder.current)}}><div style={{width:2+'vh', bottom:2+'vh'}}></div><MdSmartToy></MdSmartToy></button>
                            </div>
                            <div style={{margin:8+'vh', marginTop:0, height:30+'%', width:40+'%', overflow:'hidden'}}>
                                <p>a thoughtful description of my profile, experiences, and aspirations. an easygoing quip about my hobbies. a motivational statement about the human potential.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="iconbar">
                    <Social link="https://www.linkedin.com/in/v-chu/" image={linkedinLogo} alt="LinkedIn" padded></Social>
                    <Social link="https://justness.itch.io/" image={itchLogo} alt="itch.io" padded></Social>
                    <Social link="https://github.com/justness" image={githubLogo} alt="GitHub" padded></Social>
                    <Social link="https://twitter.com/jjustness" image={twitterLogo} alt="Twitter" padded></Social>
                    <Social link="mailto:vanessa.chu@mail.mcgill.ca" image={emailLogo} alt="Email"></Social>
                </div>
            </div>
        </div>
    )
}