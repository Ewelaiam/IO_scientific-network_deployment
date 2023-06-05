import Draggable from "react-draggable";
import { generateStyle } from "./IconStyle";
import { Info } from "./Info";
import { NetworkUser } from "../../../types/NetworkUser";

export function Icon({
    colors,
    networkUser,
}: {
    colors: string[];
    networkUser: NetworkUser;
}) {
    let circleStyle: { background: string } = generateStyle(colors);
    return (
        <Draggable>
            <div className="icon">
                <div className={`outer_circle`} style={circleStyle}>
                    <img
                        className="circle"
                        src={
                            networkUser.ImageLink ? networkUser.ImageLink : "/person.jpg"
                        }
                        draggable="false"
                    ></img>
                </div>
                <Info user = {networkUser}/>
            </div>
        </Draggable>
    );
}
