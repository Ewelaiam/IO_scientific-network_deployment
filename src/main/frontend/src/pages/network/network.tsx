import "../../styles/network.css";
import { Icon } from "./Info/Icon";
import {Legend} from "./Legend"
import { NetworkAPI } from "../../types/NetworkAPI";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {NetworkUser} from "../../types/NetworkUser";
import {University} from "../../types/University";


export default function Network() {
    let agh = {Name:"Agh University of Science and Technology"};
    let uj = {Name:"Jagiellonian University"};
    //let agh = {Name:"AGH"}
    //let uj = {Name:"UJ"}
    let x:NetworkAPI ={
        MyUniversities : [
            agh, uj],
        Users: [
            {
                FirstName: "Name",
                LastName: "Surname",
                ImageLink: "/person2.jpg",
                Universities: [
                    agh,
                    {
                        Name:"Other university"
                    },
                    uj
                ]
            },
            {
                FirstName: "Name",
                LastName: "Surname",
                ImageLink: "/person1.jpg",
                Universities: [
                    {
                        Name:"Other university"
                    },
                    uj
                ]
            },
            {
                FirstName: "Name",
                LastName: "Surname",
                Universities: [
                    agh
                ]
            },
        ]
    };

    const [cookies, setCookies] = useCookies(['loginCookie'])

    const [networkAPI, setNetworkAPI] = useState(x)

    useEffect(() => {
        fetch("http://localhost:8080/network/")
            .then(data => data.json())
            .then(data => handleResponse(data))
    }, [])

    const handleResponse = (data:any) => {
        let users : NetworkUser[] = []
        let myID = cookies.loginCookie
        let myUniversities: University[] = []

        for(let user of data) {
            if(user.userId == myID){
                myUniversities = user.organizations;
                continue;
            }
            let userOrg = []
            for(let org of user.organisations) {
                userOrg.push({Name:org.name})
            }
            let images = ["/person2.jpg","/person1.jpg","/person.jpg"];
            let networkUser:NetworkUser = {
                FirstName: user.name,
                LastName: user.surname,
                ImageLink: user.imageUrl,
                Universities: userOrg
            }
            users.push(networkUser)
        }
        let netApi:NetworkAPI = {
            MyUniversities: x.MyUniversities,
            Users:users
        }
        setNetworkAPI(netApi)
    }
    function generateColors(userUniversities:University[], myUniversities:University[]):string[]{

        const [main, second] = myUniversities.slice(0,2);
        const colors:string[] = [];
        userUniversities.forEach((univ)=>{
            if(univ.Name == main.Name)
                colors.push("00FF00");
        })

        userUniversities.forEach((univ)=>{
            if(univ.Name == second.Name){
                colors.push("FF0000");
            }
        })

        userUniversities.forEach((univ)=>{
            if(univ.Name != main.Name && univ.Name != second.Name)
                colors.push("0000FF");
        })

        return colors;
    }
    function generateIcons(){
        const icons = [];
        for(let i = 0; i < networkAPI.Users.length;i++){
            icons.push(
                <Icon
                    colors={generateColors(networkAPI.Users[i].Universities,networkAPI.MyUniversities)}
                    networkUser = {networkAPI.Users[i]}
                />
            )
        }
        return icons;
    }
    return (
        <div className="networkContainer">
            {generateIcons()}
            <Legend/>
        </div>
    );
}
