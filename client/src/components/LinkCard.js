import React from 'react'

export const LinkCard = ({link}) => {

    return (
        <>
        <h2> Link </h2>
        <p> Code link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p> Link from: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p> Clicks amount: <strong>{link.clicks}</strong></p>
        <p> Created: <strong>{new Date(link.clicks).toLocaleDateString()}</strong></p>
        </>
    )
}
