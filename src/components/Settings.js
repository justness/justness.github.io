import React, { useRef } from 'react'
import bkgAudio from '../audio/BackbayLounge.mp3'

var lightmode = true;
var audioPlaying = false;

export default function Settings() {
    const bkgAudioComponent = useRef()
    const settingsOptions = useRef()
    const displayOption = useRef()
    const audioOption = useRef()

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
    const toggleMode = () => {
        var images = document.getElementsByTagName("IMG");
        if (lightmode) {
            displayOption.current.innerHTML = `<iron-icon icon="image:flare"></iron-icon>`;
            document.documentElement.style.setProperty('--basic',"white");
            document.documentElement.style.setProperty('--basic-alt', "rgb(230,230,230)");
            document.documentElement.style.setProperty('--bkg',"black");
            document.documentElement.style.setProperty('--accent',"rgb(232,197,76)");
            document.documentElement.style.setProperty('--accent-highlighted',"rgb(255,232,151)");
            for (var i = 0; i < images.length; i++){ if (images[i].getAttribute("staticImage") !== "true") images[i].style.filter = "invert(0)"; }
        }
        else {
            displayOption.current.innerHTML = `<iron-icon icon="image:brightness-3"></iron-icon>`;
            document.documentElement.style.setProperty('--basic',"black");
            document.documentElement.style.setProperty('--basic-alt', "rgb(90,90,90)");
            document.documentElement.style.setProperty('--bkg',"white");
            document.documentElement.style.setProperty('--accent',"rgb(92,128,188)");
            document.documentElement.style.setProperty('--accent-highlighted',"rgb(86,205,234)");
            for (var i = 0; i < images.length; i++){ if (images[i].getAttribute("staticImage") !== "true") images[i].style.filter = "invert(1)"; }
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
        <div id="settings">
            <button onClick={toggleDropdown} style={{border:"1px var(--basic) solid"}}><iron-icon icon="settings"></iron-icon></button><br />
            <div ref={settingsOptions} style={{opacity:0, height:0, display:'inline-flex', flexDirection:'row', marginRight:1+'vh', transition:'all .5s'}}>
                <button id="display-option" ref={displayOption} onClick={toggleMode}><iron-icon icon="image:brightness-3"></iron-icon></button>
                <paper-tooltip for="display-option" position="top">Light/Dark mode</paper-tooltip>
                <button id="audio-option" ref={audioOption} onClick={toggleAudio}><iron-icon icon="av:play-arrow"></iron-icon></button>
                <paper-tooltip for="audio-option" position="top">Backbay Lounge Kevin MacLeod (incompetech.com)</paper-tooltip>
            </div>
            <audio id="bkg-audio" ref={bkgAudioComponent} src={bkgAudio} loop />
        </div>
    )
}