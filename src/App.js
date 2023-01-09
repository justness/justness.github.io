import React, { useRef } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
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

    const hobbies = [
        "Beach combing",
        "Bug keeping",
        "Casual Tetris",
        "D&D Homebrew",
        "Derivative writing",
        "Digital painting",
        "Ice skating",
        "Indoor gardening",
        "Kickboxing",
        "Needle-felting",
        "Paddling",
        "Paintball",
        "Plant pressing",
        "Storyboarding",
        "Urban sketching",
        "Webcomic creation",
        "Vtubing",
    ]

    const toggleSidebar = (element) => { // TODO: Generalize this function.
        if (element.style.width === "100vh"){
            element.style.width = "0";
        }
        else {
            element.style.width = "100vh";
        }
    }

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
            <div>
                <div style={{display:'flex'}}>
                    <div class="resume-holder" ref={workHolder}>
                        <div class="resume-contents">
                            <div>
                                <h3 style={{color:"white"}}>
                                    Macro
                                </h3>
                                <p style={{margin:0}}>
                                    2022-present                
                                </p>
                                <p style={{margin:0}}>
                                    Software Engineer
                                </p>
                            </div>
                            <div>
                                <h3 style={{color:"white"}}>
                                    Ubisoft Montreal
                                </h3>
                                <p style={{margin:0}}>
                                    2021                            
                                </p>
                                <p style={{margin:0}}>
                                    Tools Programming Intern
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="resume-holder" ref={educationHolder}>
                        <div class="resume-contents">
                            <div>
                                <h3 style={{color:"white"}}>
                                    McGill University
                                </h3>
                                <p style={{margin:0}}>
                                    2018-2022                       
                                </p>
                                <p style={{margin:0}}>
                                    B.Sc. Computer Science/Biology Joint Major
                                </p>
                            </div>
                            <div>
                                <h3 style={{color:"white"}}>
                                    Google
                                </h3>
                                <p style={{margin:0}}>
                                    2020                      
                                </p>
                                <p style={{margin:0}}>
                                    Google SPS Participant
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="resume-holder" ref={hobbiesHolder}>
                        <div style={{marginTop:"24px", whiteSpace:"nowrap"}}>
                            {hobbies.map(hobby => {
                                return (
                                    <p style={{margin:0, textAlign:"center", overflow:"hidden"}}>{hobby}</p>
                                );
                            })}
                        </div>
                    </div>
                    <div style={{flexGrow:1, height:90+'vh', backgroundColor:'var(--bkg)', overflowY:"scroll"}}>
                        <div style={{display:"flex"}}>
                            <h1 id="title" className="item" style={{fontSize:"160px", display:'inline-flex', wordBreak:"break-all", lineHeight:"120px", marginTop:"54px", marginLeft:"54px"}}>ness chu</h1>
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
                            <div style={{margin:8+'vh', height:30+'%', width:40+'%', overflow:'hidden'}}>
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