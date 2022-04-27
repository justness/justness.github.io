import React from 'react'

export default function BigPost(props) {
    return (
        <div style={{display:'flex',flexDirection:'column',maxWidth:500+'px',alignItems:'center',justifyContent:'center',padding:20+'px',margin:20+'px',backgroundColor:'var(--basic)'}}>
            <a href={props.link}>
                <img staticImage="true" src={props.image} style={{width:500+'px',height:250+'px',backgroundPosition:'center center',backgroundRepeat:'no-repeat',overflow:'hidden',objectFit:'cover'}}></img>
            </a>
            <p style={{margin:0,color:'var(--bkg)'}}>{props.title}</p>
            <p style={{margin:0,color:'var(--bkg)',fontSize:18+'px'}}>{props.content}</p>
        </div>
    )
}