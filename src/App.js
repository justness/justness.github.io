import React, { useRef } from 'react'
import LazyLoad from 'react-lazyload';
import { BrowserRouter as Router, Link } from 'react-router-dom' // Do not remove Router
import '@polymer/paper-tooltip'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/av-icons.js'
import '@polymer/iron-icons/image-icons.js'
import './style.css'

import bkgAudio from './audio/BackbayLounge.mp3'
import resume from './documents/NessChu_Resume.pdf'
import emailLogo from './images/logos/email.png'
import githubLogo from './images/logos/github.png'
import itchLogo from './images/logos/itchio.png'
import linkedinLogo from './images/logos/linkedin.png'
import twitterLogo from './images/logos/twitter.png'

var lightmode = true;
var audioPlaying = false;

export default function App() {
    const resumeHolder = useRef()
    const settingsOptions = useRef()
    const displayOption = useRef()
    const audioOption = useRef()
    const bkgAudioComponent = useRef()

    const toggleDropdown = () => {
        if (settingsOptions.current.style.opacity == 1){
            settingsOptions.current.style.opacity = 0;
            settingsOptions.current.style.height = 0;
        }
        else {
            settingsOptions.current.style.opacity = 1;
            settingsOptions.current.style.height = "auto";
        }
    }
    const toggleResumeHolder = () => { // TODO: Generalize this function.
        if (resumeHolder.current.style.width === "80vh"){
            resumeHolder.current.style.width = "0";
        }
        else resumeHolder.current.style.width = "80vh";
    }
    const toggleMode = () => {
        var images = document.getElementsByTagName("IMG");
        if (lightmode) {
            displayOption.current.innerHTML = `<iron-icon icon="image:flare"></iron-icon>`;
            document.documentElement.style.setProperty('--basic',"white");
            document.documentElement.style.setProperty('--basic-alt', "rgb(230,230,230)");
            document.documentElement.style.setProperty('--bkg',"black");
            document.documentElement.style.setProperty('--accent',"rgb(232,197,76)");
            document.documentElement.style.setProperty('--accent-highlighted',"rgb(255,232,151)");
            for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(0)"; }
        }
        else {
            displayOption.current.innerHTML = `<iron-icon icon="image:brightness-3"></iron-icon>`;
            document.documentElement.style.setProperty('--basic',"black");
            document.documentElement.style.setProperty('--basic-alt', "rgb(90,90,90)");
            document.documentElement.style.setProperty('--bkg',"white");
            document.documentElement.style.setProperty('--accent',"rgb(92,128,188)");
            document.documentElement.style.setProperty('--accent-highlighted',"rgb(86,205,234)");
            for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(1)"; }
        }
        lightmode = !lightmode;
    }
    const toggleAudio = () => {
        if (audioPlaying) {
            bkgAudioComponent.current.pause();
            audioOption.current.innerHTML = `<iron-icon icon="av:play-arrow"></iron-icon>`;
        }
        else {
            bkgAudioComponent.current.volume = 0.1;
            bkgAudioComponent.current.play();
            audioOption.current.innerHTML = `<iron-icon icon="av:pause"></iron-icon>`;
        }
        audioPlaying = !audioPlaying;
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
                        <div id="settings">
                            <button onClick={toggleDropdown} style={{border:"1px var(--basic) solid"}}><iron-icon icon="settings"></iron-icon></button><br />
                            <div ref={settingsOptions} style={{opacity:0, height:0, display:'inline-flex', flexDirection:'row', marginRight:1+'vh', transition:'all .5s'}}>
                                <button id="display-option" ref={displayOption} onClick={toggleMode}><iron-icon icon="image:brightness-3"></iron-icon></button>
                                <paper-tooltip for="display-option" position="top">Light/Dark mode</paper-tooltip>
                                <button id="audio-option" ref={audioOption} onClick={toggleAudio}><iron-icon icon="av:play-arrow"></iron-icon></button>
                                <paper-tooltip for="audio-option" position="top">Backbay Lounge Kevin MacLeod (incompetech.com)</paper-tooltip>
                            </div>
                        </div>
                        <p style={{marginTop:0, paddingLeft:2+'vh'}}>computer science // biology // game dev</p>
                        <button className="side-tab" onClick={toggleResumeHolder}><div style={{width:2+'vh', bottom:2+'vh'}}></div>resume</button>
                        <div style={{margin:8+'vh', height:30+'%', width:40+'%', overflow:'hidden'}}>
                            <p>a thoughtful description of my profile, experiences, and aspirations. an easygoing quip about my hobbies. a motivational statement about the human potential.</p>
                        </div>
                    </div>
                </div>
                <div id="iconbar">
                    <a className="logo" href="https://www.linkedin.com/in/v-chu/" target="_blank">
                        <img src={linkedinLogo} alt="LinkedIn" width="48" height="48" style={{filter:'invert(1)'}} />
                    </a>
                    <div style={{padding: 28+'px'}}></div>
                    <a className="logo" href="https://justness.itch.io/" target="_blank">
                        <img src={itchLogo} alt="itch.io" width="48" height="48" style={{filter:'invert(1)'}} />
                    </a>
                    <div style={{padding: 28+'px'}}></div>
                    <a className="logo" href="https://github.com/justness" target="_blank">
                        <img src={githubLogo} alt="GitHub" width="48" height="48" style={{filter:'invert(1)'}} />
                    </a>
                    <div style={{padding: 28+'px'}}></div>
                    <a className="logo" href="https://twitter.com/jjustness" target="_blank">
                        <img src={twitterLogo} alt="Twitter" width="48" height="48" style={{filter:'invert(1)'}} />
                    </a>
                    <div style={{padding: 28+'px'}}></div>
                    <a className="logo" href="vanessa.chu@mail.mcgill.ca" target="_blank">
                        <img src={emailLogo} alt="Email" width="48" height="48" style={{filter:'invert(1)'}} />
                    </a>
                </div>
                <audio id="bkg-audio" ref={bkgAudioComponent} src={bkgAudio} loop />
            </div>
        </div>
    )
}