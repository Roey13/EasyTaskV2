import React from 'react'
export function BgPicksList({ bgPicks, onChangeBg }) {
    const pick = bgPicks
    return (
        <div className='picks'>
            <div className='pick 1' onClick={() => onChangeBg(pick, 'https://bit.ly/3yLM7uN', '#61bd4f')} style={(pick === 'photos') ? { backgroundImage: `url('https://bit.ly/3yLM7uN')` } : { backgroundColor: '#61bd4f' }}></div >
            <div className='pick 2' onClick={() => onChangeBg(pick, 'https://cdn.shopify.com/s/files/1/0257/6718/2416/files/Party-Background-green-with-presents.jpg?v=1595051600', '#f2d600')} style={(pick === 'photos') ? { backgroundImage: `url(https://cdn.shopify.com/s/files/1/0257/6718/2416/files/Party-Background-green-with-presents.jpg?v=1595051600)` } : { backgroundColor: '#f2d600' }}></div >
            <div className='pick 3' onClick={() => onChangeBg(pick, 'https://bit.ly/2Rhir82', '#ff9f1a')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/2Rhir82)` } : { backgroundColor: '#ff9f1a' }}></div >
            <div className='pick 4' onClick={() => onChangeBg(pick, 'https://bit.ly/2S5SicM', '#eb5a46')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/2S5SicM)` } : { backgroundColor: '#eb5a46' }}></div >
            <div className='pick 5' onClick={() => onChangeBg(pick, 'https://bit.ly/3ifWH7t', '#c377e0')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/3ifWH7t)` } : { backgroundColor: '#c377e0' }}></div >
            <div className='pick 6' onClick={() => onChangeBg(pick, 'https://bit.ly/3cb6doI', '#0079bf')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/3cb6doI)` } : { backgroundColor: '#0079bf' }}></div >
            <div className='pick 7' onClick={() => onChangeBg(pick, 'https://bit.ly/3uOBV1o', '#00c2e0')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/3uOBV1o)` } : { backgroundColor: '#00c2e0' }}></div >
            <div className='pick 8' onClick={() => onChangeBg(pick, 'https://bit.ly/3uMTS0u', '#51e898')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/3uMTS0u)` } : { backgroundColor: '#51e898' }}></div >
            <div className='pick 9' onClick={() => onChangeBg(pick, 'https://bit.ly/3idR4GZ', '#ff78cb')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/3idR4GZ)` } : { backgroundColor: '#ff78cb' }}></div >
            <div className='pick 10' onClick={() => onChangeBg(pick, 'https://bit.ly/34GK1Pl', '#344563')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/34GK1Pl)` } : { backgroundColor: '#344563' }}></div >
            <div className='pick 11' onClick={() => onChangeBg(pick, 'https://bit.ly/3irFJU7', '#b3bac5')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/3irFJU7)` } : { backgroundColor: '#b3bac5' }}></div >
            <div className='pick 12' onClick={() => onChangeBg(pick, 'https://bit.ly/34L6DOp', '#ffffff')} style={(pick === 'photos') ? { backgroundImage: `url(https://bit.ly/34L6DOp)` } : {
                backgroundColor: '#ffffff',
                border: '0.5px solid black'
            }}></div >

        </div>

    )
}