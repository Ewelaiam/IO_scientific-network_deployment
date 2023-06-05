import { Box, Modal, Typography, makeStyles } from "@mui/material";
import {useState} from "react";


type VerifyUniversityModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    defaultOrganisationName: string;
    defaultMailTemplate: string;
    onSave: (updatedUserData: any) => void;
}

const VerifyUniversityModal = (props: VerifyUniversityModalProps) => {
    const [acceptUniversityName, setAcceptUniversityName] = useState<string>(props.defaultOrganisationName);
    const [acceptMailTemplate, setAcceptMailTemplate] = useState<string>(props.defaultMailTemplate);

    const onSave = () => {
        const acceptedOrganisationData = {
            ...(acceptUniversityName ? { name: acceptUniversityName } : {}),
            ...(acceptMailTemplate ? { mailTemplate: acceptMailTemplate } : {}),
        };
        props.onSave(acceptedOrganisationData);
        props.handleClose();
    }
    return (
        <div>
            <label>University name</label>
            <input
                name="adminUniversityName"
                type="text"
                value={acceptUniversityName}
                onChange={(e) => setAcceptUniversityName(e.target.value)}
                className={"form-control mb-4 text-center"}
            />
            <label>Mail template</label>
            <input
                name="adminMailTemplate"
                type="text"
                value={acceptMailTemplate}
                onChange={(e) => setAcceptMailTemplate(e.target.value)}
                className={"form-control mb-4 text-center"}
            />
            <button onClick={onSave}>Save</button>
        </div>
    );
}

export default VerifyUniversityModal;