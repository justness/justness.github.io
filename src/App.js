import React, { useRef } from 'react'
import LazyLoad from 'react-lazyload';
import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
import Settings from './components/Settings.js'
import Social from './components/Social.js'
import '@polymer/paper-tooltip'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/av-icons.js'
import '@polymer/iron-icons/image-icons.js'
import './style.css'
import resume from './documents/NessChu_Resume.pdf'
import emailLogo from './images/logos/email.png'
import githubLogo from './images/logos/github.png'
import itchLogo from './images/logos/itchio.png'
import linkedinLogo from './images/logos/linkedin.png'
import twitterLogo from './images/logos/twitter.png'

export default function App() {
    const resumeHolder = useRef()

    const toggleResumeHolder = () => { // TODO: Generalize this function.
        if (resumeHolder.current.style.width === "80vh"){
            resumeHolder.current.style.width = "0";
        }
        else resumeHolder.current.style.width = "80vh";
    }

    return (
        <div>
            <div style={{height:10+'vh'}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:100+'%', height:9.9+'vh'}}>
                    <Link className="router-link" to="/">HOME</Link>
                    <Link className="router-link" to="gamedev">GAMEDEV</Link>
                    <Link className="router-link" to="design">DESIGN</Link>
                    <Link className="router-link" to="biology">BIOLOGY</Link>
                </div>
                <div style={{backgroundColor:'var(--basic)', width:100+'%', height:.1+'vh', minHeight:1+'px'}}></div>
            </div>
            <div>
                <div style={{display:'flex'}}>
                    <div id="resume-holder" ref={resumeHolder}>
                        <LazyLoad id="resume-pdf">
                            <iframe type="application/pdf" src={resume} border="0" style={{display:'flex', margin:2+'vh', width:75+'vh', height:85+'vh'}} />
                        </LazyLoad>
                    </div>
                    <div style={{flexGrow:1, height:90+'vh', backgroundColor:'var(--bkg)'}}>
                        <h1 id="title" className="item" style={{padding:1+'vh', display:'inline-flex'}}>&gt; ness chu&nbsp;</h1>
                        <Settings></Settings>
                        <p style={{marginTop:0, paddingLeft:2+'vh'}}>computer science // biology // game dev</p>
                        <button className="side-tab" onClick={toggleResumeHolder}><div style={{width:2+'vh', bottom:2+'vh'}}></div>resume</button>
                        <div style={{margin:8+'vh', height:30+'%', width:40+'%', overflow:'hidden'}}>
                            <p>a thoughtful description of my profile, experiences, and aspirations. an easygoing quip about my hobbies. a motivational statement about the human potential.</p>
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