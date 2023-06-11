import {ProfileData} from "../../types/ProfileData";
import "../../styles/SearchResults.css"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";

type SearchResultsProps = {
    results: ProfileData[],
    resetFun: Function
}






export default function SearchResults(props:SearchResultsProps) {

    const [results, setResults] = useState(props.results)
    const navigate = useNavigate();

    const handleClick = (id: number|undefined) => {
        props.resetFun()
        if(id != undefined) {
            navigate("/profil/"+id)
        }
    }

    if(props.results.length != 0) {
        return (
            <div className={"results"} >
                {props.results.map((profileData, index) => (
                    <div key={index} className={"result"} onClick={() => handleClick(profileData.userId)}>
                        {profileData.name} {profileData.surname}
                    </div>
                ))
                }
            </div>
        )
    }
    return null
}
