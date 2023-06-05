import { Box, Modal, Typography, makeStyles } from "@mui/material";
import { useState } from "react";

type EditProfileModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    // todo: change to ProfileData type
    defaultEmail: string;
    defaultName: string;
    defaultSurname: string;
    onSave: (updatedUserData: any) => void;
}

const EditProfileModal = (props: EditProfileModalProps) => {
    const [newEmail, setNewEmail] = useState<string>(props.defaultEmail);
    const [newName, setNewName] = useState<string>(props.defaultName);
    const [newSurname, setNewSurname] = useState<string>(props.defaultSurname);

    const enableSaveButton = newEmail !== props.defaultEmail || newName !== props.defaultName || newSurname !== props.defaultSurname;
    
    const onSave = () => {
        const updatedUserData = {
            ...(newName ? { name: newName } : {}),
            ...(newSurname ? { surname: newSurname } : {}),
            ...(newEmail ? { email: newEmail } : {}),
        };
        props.onSave(updatedUserData);
        props.handleClose();
        // fetch to backend with all the form data changed by the user
    };

    const sxStyles = {
        backgroundColor: 'white',
        border: '2px solid #16484F',
        boxShadow: 24,
        p: 4,
        width: '50%',
        height: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
    }
    const modalHeaderStyles = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px',
    }
    const buttonStyles = {
        backgroundColor: '#16484F',
        color: 'white',
    }

    return <Modal 
        open={props.isOpen}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
            <Box sx={sxStyles}>
            <div style={modalHeaderStyles}> 
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit your profile data
                </Typography>
                <button style={buttonStyles} onClick={props.handleClose}>X</button>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
            <div>
                <p className="itemLabel">Name</p>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div>
                <p className="itemLabel">Surname</p>
                <input type="text" value={newSurname} onChange={(e) => setNewSurname(e.target.value)} />
            </div>
            <div>
                <p className="itemLabel">Email</p>
                <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <button style={buttonStyles} disabled={!enableSaveButton} onClick={onSave}>save</button>
            
            </Box>
    </Modal>
}

export default EditProfileModal;