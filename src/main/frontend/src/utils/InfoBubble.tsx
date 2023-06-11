import './InfoBubble.css';
import { ProfileData } from '../types/ProfileData';
import {useCookies} from "react-cookie";
import {useState} from "react";


const InfoBubble = (props: any) => {
    const [cookies, setCookie] = useCookies(['loginCookie']);
    return <div className={props.isOwner ? 'container owner-container': 'container'}  style={{backgroundImage:  'url(' + props.imageUrl + ')'}} onClick={props.uploadFunction}>
    <p className='university'>{props.organisations && props.organisations[0]?.mailTemplate.split(".")[0].toUpperCase()}</p>
</div>;
}



export default InfoBubble;
