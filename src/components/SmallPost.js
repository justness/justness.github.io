import React from 'react'

export default function SmallPost(props) {
    return (
        <div style={{display:'flex',flexDirection:'column',maxWidth:200+'px',alignItems:'center',padding:20+'px',margin:20+'px',backgroundColor:'var(--basic)'}}>
            <img src={props.image}></img>
            <p style={{margin:0,color:'var(--bkg)'}}>{props.title}</p>
        </div>
    )
}