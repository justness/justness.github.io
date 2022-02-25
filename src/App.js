import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import '@polymer/paper-tooltip'
import './style.css'

import bkgAudio from './audio/BackbayLounge.mp3'
import resume from './documents/NessChu_Resume.pdf'
import emailLogo from './images/logos/email.png'
import githubLogo from './images/logos/github.png'
import itchLogo from './images/logos/itchio.png'
import linkedinLogo from './images/logos/linkedin.png'
import twitterLogo from './images/logos/twitter.png'

var lightmode = false;
var audioPlaying = false;

const App = () => {
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
    const toggleResumeHolder = () => {
        if (resumeHolder.current.style.width === "80vh"){
            resumeHolder.current.style.width = "0";
        }
        else resumeHolder.current.style.width = "80vh";
    }
    const toggleMode = () => {
        var images = document.getElementsByTagName("IMG");
        if (lightmode) {
            displayOption.current.innerHTML = "☀️";
            document.documentElement.style.setProperty('--basic',"white");
            document.documentElement.style.setProperty('--basic-alt', "rgb(230,230,230)");
            document.documentElement.style.setProperty('--bkg',"black");
            document.documentElement.style.setProperty('--accent',"rgb(232,197,76)");
            document.documentElement.style.setProperty('--accent-highlighted',"rgb(255,232,151)");
            for (var i = 0; i < images.length; i++){ images[i].style.filter = "invert(0)"; }
        }
        else {
            displayOption.current.innerHTML = "🌙";
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
            audioOption.current.innerHTML = "▶️";
        }
        else {
            bkgAudioComponent.current.play();
            audioOption.current.innerHTML = "⏸";
        }
        audioPlaying = !audioPlaying;
    }

    return (
        <div>
            <div style={{display:'flex'}}>
                <div id="resume-holder" ref={resumeHolder}>
                    <div id="resume-pdf">
                        <iframe type="application/pdf" src={resume} border="0" style={{display:'flex', margin:2+'vh', width:75+'vh', height:96+'vh'}} />
                    </div>
                </div>
                <div style={{flexGrow:1, marginLeft:1+'vh', backgroundColor:'var(--bkg)'}}>
                    <h1 id="title" className="item">&gt; ness chu</h1>
                    <p style={{marginTop:0}}>computer science // biology // event organization</p>
                    <button onClick={toggleResumeHolder} style={{marginLeft:2+'vh'}}>resume</button>
                </div>
                <div style={{backgroundColor:'var(--bkg)'}}>
                    <p></p>
                </div>
            </div>

            <div id="settings">
                <button onClick={toggleDropdown} style={{marginBottom:1+'vh'}}>{'⚙️'}</button><br />
                <div id="settings-options" ref={settingsOptions} style={{opacity:0, height:0, transition:'all .5s'}}>
                    <button id="display-option" ref={displayOption} onClick={toggleMode} style={{fontSize:18+'px'}}>{'☀️'}</button><br />
                    <paper-tooltip for="display-option" position="left">Light/Dark mode</paper-tooltip>
                    <button id="audio-option" ref={audioOption} onClick={toggleAudio} style={{fontSize:18+'px'}}>{'▶️'}</button>
                    <paper-tooltip for="audio-option" position="left">Backbay Lounge Kevin MacLeod (incompetech.com)</paper-tooltip>
                </div>
            </div>
            <div id="iconbar">
                <a href="https://www.linkedin.com/in/v-chu/" target="_blank">
                    <img src={linkedinLogo} alt="LinkedIn" width="48" height="48" />
                </a>
                <div style={{padding: 28+'px'}}></div>
                <a href="https://justness.itch.io/" target="_blank">
                    <img src={itchLogo} alt="itch.io" width="48" height="48" />
                </a>
                <div style={{padding: 28+'px'}}></div>
                <a href="https://github.com/justness" target="_blank">
                    <img src={githubLogo} alt="GitHub" width="48" height="48" />
                </a>
                <div style={{padding: 28+'px'}}></div>
                <a href="https://twitter.com/jjustness" target="_blank">
                    <img src={twitterLogo} alt="Twitter" width="48" height="48" />
                </a>
                <div style={{padding: 28+'px'}}></div>
                <a href="vanessa.chu@mail.mcgill.ca" target="_blank">
                    <img src={emailLogo} alt="Email" width="48" height="48" />
                </a>
            </div>
            <audio id="bkg-audio" ref={bkgAudioComponent} src={bkgAudio} autoPlay loop />
        </div>
    )
}
export default App

ReactDOM.render(<App />, document.getElementById("root"))