import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Grid, Typography, getFormControlUtilityClasses } from '@mui/material';
import InfoBubble from '../../utils/InfoBubble';
import './profile.css';
import EditProfileModal from './EditProfileModal';
import AddInterestModal from './AddInterestModal';
import VerifyUniversityModal from './VerifyUniversityModal';
import { useEffect, useState } from 'react';
import { ProfileData } from '../../types/ProfileData';
import { Err } from '../../types/Err';
import { Organisation } from "../../types/Organisation";
// @ts-ignore
import Cookies from "js-cookie";
import eventbus from '../eventbus/eventbus'
import { useCookies } from "react-cookie";
import { useLocation, useParams } from "react-router-dom";
import { deleteData, fetchData, postData, putData } from '../../utils/fetchApi';


function editProfileData() {
    console.log('edit');
}

// const fetchProfileData = fetchData<ProfileData>('http://localhost:8080/profile/' + Cookies.get("user_id"));
export default function Profile(props: any) {

    const [cookies, setCookie] = useCookies()
    const [errors, setErrors] = useState<Err[]>([])

    const [open, setOpen] = useState<boolean>(false);
    const [openAddInterest, setOpenAddInterest] = useState<boolean>(false);
    const [editInterest, setEditInterest] = useState<boolean>(true);
    const [interestButton, setInterestButton] = useState<string>("Edit");
    const { id } = useParams()
    const [isOwner, setIsOwner] = useState(true);

    const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
    const [showAdminButton, setShowAdminButton] = useState<boolean>(true);
    // Interests
    // To do: delete those mock interests
    const [interests, setInterests] = useState<string[]>(["Computer Science", "D17"]);
    const showAddButtonCondition = () => {
        if (interests.length >= 3) {
            return false;
        }
        else {
            return true;
        }
    }

    const [showAddButton, setShowAddButton] = useState<boolean>(showAddButtonCondition());
    const [profileData, setProfileData] = useState<ProfileData>({
        email: '', name: '', surname: '', organisations: [{
            id: 0,
            isVerified: false,
            name: '',
            mailTemplate: ''
        }]
    });
    const fetchProfileData = fetchData<ProfileData>('http://localhost:8080/profile/' + id);
    const fetchInterests = fetchData<string[]>('http://localhost:8080/profile/interests/' + id);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAddInterestOpen = () => setOpenAddInterest(true);
    const handleAddInterestClose = () => setOpenAddInterest(false);
    const handleInterestClose = () => { setEditInterest(true); setInterestButton("Edit") };
    const handleShowAdminModal = () => setShowAdminModal(!showAdminModal);
    // const handleCloseAdminModal = () => setOpenAdminModal(false);
    // const handleOpenAdminModal = () => {
    //     setShowAdminButton(true);
    //
    // }
    const handleInterestOpen = () => {
        if (interestButton == "Edit") {
            setEditInterest(false);
            setInterestButton("Save")
        }
        else {
            setEditInterest(true);
            setInterestButton("Edit")
        }
    };
    const handleSave = (updatedUserData: Partial<ProfileData>) => {
        // fetch to backend with all the form data changed by the user
        putData('http://localhost:8080/profile/edit?id=' + id, updatedUserData);
        setProfileData((currentProfileData) => ({ ...currentProfileData, ...updatedUserData }));
    };

    const handleInterstSave = (interest: string) => {
        // fetch to backend with new interest added by the user
        console.log("add interest");
        if (interests.length >= 3) {
            console.log("too many interests");
            setShowAddButton(false);
            return;
        }
        else {
            setShowAddButton(true);
            const postFunct = postData('http://localhost:8080/interest/add/' + id, interest);
            postFunct(() => {}, () => {}, () => {})
            setInterests(interests => [...interests, interest]);
            console.log(interests);
            setShowAddButton(false);
        }
    };

    const handleOrganisationSave = (acceptedOrganisationData: Organisation) => {
        postData('http://localhost:8080/organisation/verify?role=ROLE_ADMIN', acceptedOrganisationData)
        // fetch('http://localhost:8080/organisation/verify?role=ROLE_ADMIN', requestOptions).then(data => handleResponseFromAdminModal(data, acceptedOrganisationData));
    };

    // const handleResponse = (data: any, updatedUserData: Partial<ProfileData>) => {
    //     if (data.status == 200) {
    //         console.log(profileData);
    //         setProfileData((currentProfileData) => ({ ...currentProfileData, ...updatedUserData }));
    //     } else {
    //         setErrors(data);
    //     }
    // }

    // const handleResponseFromAdminModal = (data: any, acceptedOrganisationData: Organisation) => {
    //     if (data.status == 200) {
    //         console.log("200");
    //     } else {
    //         setErrors(data);
    //     }
    // }

    const deleteInterest = (interest: string) => {
        return () => {
            console.log("delete interest");
            setInterests(interests.filter(item => item !== interest));
            console.log(interests);
            setShowAddButton(true);
            // fetch to delete interest from backend
            let delFunct = deleteData('http://localhost:8080/interest/delete/' + id, interest);
            delFunct(() => {}, () => {}, () => {})
        }
    }

    const handleInterests = (interests:any[]) => {
        let userInterests:string[] = []
        for(let interest of interests) {
            userInterests.push(interest['name'])
        }
        setInterests(userInterests)
    }

    useEffect(() => {
        fetchProfileData(setProfileData, setIsLoading, setErrorMessage);
        fetchInterests(handleInterests, setIsLoading, setErrorMessage);
        setIsOwner(id == Cookies.get("user_id"))
    }, [id]);

    if (errorMessage) return <div>{errorMessage} - could not load profile data</div>;

    return (<div>
        <div className="profileContainer">
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <div> </div>
                <div className='buttonsContainer'>
                    {showAdminButton && <button onClick={handleShowAdminModal}>Verify</button>}
                    <div className='editButton' hidden={isOwner == false} onClick={handleOpen}>Edit</div>
                </div>

            </Grid>
            <Grid container
                direction="row"
                justifyContent="space-around"
                alignItems="center">
                <Grid m={6}>
                    <Avatar>{profileData.surname?.at(0)}{profileData.name?.at(0)}</Avatar>
                    <InfoBubble
                        name={profileData.name ?? ''}
                        surname={profileData.surname ?? ''}
                        organisations={profileData.organisations ?? ''}
                    ></InfoBubble>
                </Grid>
                <Grid m={8}>
                    <Stack className='stackContainer'>
                        <div className='itemContainer'>
                            <p className='itemLabel'>email</p>
                            <p className='itemData'>{profileData.email ?? 'email@agh.edu.pl'}</p>
                        </div>
                        <div className='itemContainer'>
                            <p className='itemLabel'>univerity</p>
                            <p className='itemData'>{profileData?.organisations?.length > 0 ? profileData.organisations[0].name : "hej"}</p>
                        </div>
                    </Stack>
                </Grid>
            </Grid>

                <EditProfileModal
            handleClose={handleClose}
            isOpen={open}
            defaultEmail={profileData.email ?? ''}
            defaultName={profileData.name ?? ''}
            defaultSurname={profileData.surname ?? ''}
            onSave={handleSave}
        />

    {
        showAdminModal &&
            <VerifyUniversityModal
                isOpen={showAdminButton}
                handleClose={handleShowAdminModal}
                defaultOrganisationName={"uek"}
                defaultMailTemplate={"uek.edu.pl"}
                onSave={handleOrganisationSave}
            />
    }
        </div >
        <div className='profileContainer'>

            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <div>Your Interests:</div>
                <div className='editButton' hidden={isOwner == false} onClick={handleInterestOpen}>{interestButton}</div>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="start"
                alignItems="center">
                {interests.map((interest, i) => (
                    <div key={i} className="interest">{interest}
                        <button className="delete" hidden={editInterest} onClick={deleteInterest(interest)}>-</button></div>
                ))}
                {showAddButton && <button className="interest" hidden={editInterest} onClick={handleAddInterestOpen}>+</button>}
                <AddInterestModal
                    handleClose={handleAddInterestClose}
                    isOpen={openAddInterest}
                    onSave={handleInterstSave}
                />

            </Grid>

        </div>

    </div >
    );
}
