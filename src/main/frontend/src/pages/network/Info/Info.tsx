import { NetworkUser } from "../../../types/NetworkUser";

export function Info({ user }: { user: NetworkUser }) {
    
    function fullName(){
        let fullName:String = "";
        if(user.Title){
            fullName += user.Title + " ";
        }
        fullName += user.FirstName + " ";
        fullName += user.LastName;
        return fullName;
    }
    function universities(){
        let universities:String = "";
        for(let i = 0; i < Math.min(3, user.Universities.length);i++){
            universities += user.Universities[i].Name;
            universities += "\n"
        }
        return universities;
    }
    return (
    <div className="hover_box">
        <div className="filler"></div>
        <div className="description">

            <p className="">{fullName()}</p>
            <p className="">{universities()}</p>
            
        </div>
    </div>   
    )
}
