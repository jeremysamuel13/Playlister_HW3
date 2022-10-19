import React, { useEffect, useState, useContext } from 'react'
import { GlobalStoreContext } from '../../store'


const DeleteSongModal = ({ deleteSongCallback, cancelDeleteSongCallback, isVisible }) => {
    const { store } = useContext(GlobalStoreContext);

    const [title, setTitle] = useState("")

    useEffect(() => {
        if (store.songToDelete) {
            setTitle(store.songToDelete.title)
        }
    }, [store.songToDelete])


    return (
        <div className={`modal${isVisible ? " is-visible" : ""}`} id="delete-song-modal" data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-song-root'>
                <div className="modal-north">
                    Delete song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently remove <b>{title}</b> from the
                        playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button" id="delete-song-confirm-button" className="modal-button" value='Confirm' onClick={() => deleteSongCallback(store.songToDelete._id)} />
                    <input type="button" id="delete-song-cancel-button" className="modal-button" value='Cancel' onClick={cancelDeleteSongCallback} />
                </div>
            </div>
        </div>
    )
}

export default DeleteSongModal