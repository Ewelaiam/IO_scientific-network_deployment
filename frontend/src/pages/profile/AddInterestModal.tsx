import { Box, Modal, Typography, makeStyles } from "@mui/material";
import { useState } from "react";
import { postData } from "../../utils/fetchApi";

type AddInterestModalProps = {
    isOpen: boolean;
    handleClose: () => void;
    onSave: (interests: any) => void;
}

const AddInterestModal = (props: AddInterestModalProps) => {
    const [newInterest, setNewInterest] = useState<string>('');

    const enableSaveButton = newInterest !== '';
    
    const onSave = () => {
        props.onSave(newInterest);
        props.handleClose();
    };

    const sxStyles = {
        backgroundColor: 'white',
        border: '2px solid #16484F',
        boxShadow: 24,
        p: 4,
        width: '50%',
        height: '35%',
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
                    Add your new interest
                </Typography>
                <button style={buttonStyles} onClick={props.handleClose}>X</button>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}></Typography>
            <div>
                <p className="itemLabel">Interest</p>
                <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} />
            </div>
            <button style={buttonStyles} disabled={!enableSaveButton} onClick={onSave}>save</button>
            
            </Box>
    </Modal>
}

export default AddInterestModal;