import React, { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../../store'

const EditSongModal = ({ editSongCallback, cancelEditSongCallback, isVisible }) => {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [youTubeId, setYouTubeId] = useState("")

    useEffect(() => {
        if (store.songToEdit) {
            setTitle(store.songToEdit.title)
            setArtist(store.songToEdit.artist)
            setYouTubeId(store.songToEdit.youTubeId)
        }
    }, [store.songToEdit])

    console.log(isVisible)
    console.log(store.songToEdit)

    return (
        <div className={`modal${isVisible ? " is-visible" : ""}`}
            id="edit-song-modal" data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-edit-song-root'>
                <div className="modal-north">
                    Edit song?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Title:
                        <input type="text" id="edit-song-title" required value={title} onChange={(event) => setTitle(event.target.value)} /><br />
                        Artist:
                        <input type="text" id="edit-song-artist" required value={artist} onChange={(event) => setArtist(event.target.value)} /><br />
                        Youtube ID:
                        <input type="text" id="edit-song-yt-id" required value={youTubeId} onChange={(event) => setYouTubeId(event.target.value)} /><br />
                    </div>
                </div>

                <div className="modal-south">
                    <input type="button" id="edit-song-confirm-button" className="modal-button" value='Confirm' onClick={() => editSongCallback(store.songToEdit._id, { title, artist, youTubeId })} />
                    <input type="button" id="edit-song-cancel-button" className="modal-button" value='Cancel' onClick={cancelEditSongCallback} />
                </div>
            </div>
        </div>
    )
}

export default EditSongModal