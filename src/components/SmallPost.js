import React from 'react'

export default function SmallPost(props) {
    return (
        <div style={{display:'flex',flexDirection:'column',maxWidth:200+'px',maxHeight:240+'px',alignItems:'center',justifyContent:'center',padding:20+'px',margin:20+'px',backgroundColor:'var(--basic)'}}>
            <img src={props.image} style={{width:200+'px',height:200+'px',backgroundPosition:'center center',backgroundRepeat:'no-repeat',overflow:'hidden',objectFit:'cover'}}></img>
            <p style={{margin:0,color:'var(--bkg)'}}>{props.title}</p>
        </div>
    )
}