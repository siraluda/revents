import { closeModal } from "../modals/modalActions";
import { SubmissionError, reset } from 'redux-form'
import { toastr } from "react-redux-toastr";

export const login = (creds) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase(); // this gives access to all the firebase methods
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
            
        } catch (error) {
            console.log(error);
            throw new SubmissionError({
                _error: error.message // we can change this to a string to customize our own error message
            })
        }
    } 
}
export const registerUser = user => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        try {
            let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password); // this will create our user in the firebase auth
            console.log(createdUser);
            await createdUser.user.updateProfile({
                displayName: user.displayName
            })
            let newUser = {
                displayName: user.displayName,
                createdAt: firestore.FieldValue.serverTimestamp()
            };
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser})
            dispatch(closeModal()); 
        } catch (error) {
            console.log(error)
            throw new SubmissionError({
                _error: error.message // we can change this to a string to customize our own error message
            })
        }
    }

    // action creator for social login
    export const socialLogin = (selectedProvider) => 
        async (dispatch, getState, {getFirebase, getFirestore}) => {
            const firebase = getFirebase();
            const firestore = getFirestore();
            try {
                dispatch(closeModal());

                let user = await firebase.login({
                    provider: selectedProvider,
                    type: 'popup'
                })

                if(user.additionalUserInfo.isNewUser) {
                    await firestore.set(`usera/${user.user.uid}`, {
                        displayName: user.profile.displayName,
                        photoURL: user.profile.avatarUrl,
                        createdAt: firestore.FieldValue.serverTimestamp()
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    
    // Action creator used to update password
    export const updatePassword = (creds) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const user = firebase.auth().currentUser;
        try {
            await user.updatePassword(creds.newPassword1);
            await dispatch(reset('account'));
            toastr.success('Success', 'Your password has been updated');
        } catch (error) {
            throw new SubmissionError({
                _error: error.message
            })
        }
    }
