import React from 'react'

export default function Social(props) {
    if (props.padded) {
        return (
            <div>
                <a className="logo" href={props.link} target="_blank">
                    <img src={props.image} alt={props.alt} width="48" height="48" style={{filter:'invert(1)'}} />
                </a>
                <div style={{padding: 28+'px'}}></div>
            </div>
        )
    }
    return (
        <div>
            <a className="logo" href={props.link} target="_blank">
                <img src={props.image} alt={props.alt} width="48" height="48" style={{filter:'invert(1)'}} />
            </a>
        </div>
    )
}