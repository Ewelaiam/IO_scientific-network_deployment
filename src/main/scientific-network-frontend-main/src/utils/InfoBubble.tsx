import './InfoBubble.css';
import { ProfileData } from '../types/ProfileData';

const InfoBubble = (props: ProfileData) => <div className='container'>
    <p className='name'>{props.name}</p>
    <p className='name'>{props.surname}</p>
    <p className='university'>{props.organisations && props.organisations[0]?.mailTemplate.split(".")[0].toUpperCase()}</p>
</div>;

export default InfoBubble;