import { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo3 from '../assets/imgs/logo3.png'
import Logo4 from '../assets/imgs/logo4.png'

export class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="home-txt-container">
                    {/* <h1 className="home-title">EasyTask</h1> */}
                    <img className="logo-home" src={Logo4}/>
                    <h3 className="home-txt">
                    EasyTask is your new partner who will help you all throughout your project.
                        From planning, through working and eventually finishing your project.
                        EasyTask is flexible to any project you could dream of.
                    </h3>
                <Link to="/board" className="home-link">COME ON IN!</Link>
                </div>
            </div>
        )
    }
}