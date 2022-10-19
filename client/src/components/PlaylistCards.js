import { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
import EditSongModal from './modal/EditSongModal.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';
import DeleteSongModal from './modal/DeleteSongModal.js';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PlaylistCards() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    const { id } = useParams()

    useEffect(() => {
        store.setCurrentList(id)
    }, [id])

    const editSongCallback = (id, song) => {
        const transaction = new EditSong_Transaction(store, id, song)
        store.addTransaction(transaction)
    }

    const cancelEditSongCallback = () => {
        store.unmarkSongForEditing()
    }

    const deleteSongCallback = (id) => {
        let transaction = new RemoveSong_Transaction(store, id)
        store.addTransaction(transaction)
    }

    const cancelDeleteSongCallback = () => {
        store.unmarkSongForDeletion()
    }

    return (
        <>
            <div id="playlist-cards">
                {
                    store.currentList?.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                            onDoubleClick={() => store.markSongForEditing(song)}
                        />
                    ))
                }
            </div>
            <DeleteSongModal isVisible={!!store.songToDelete} deleteSongCallback={deleteSongCallback} cancelDeleteSongCallback={cancelDeleteSongCallback} />
            <EditSongModal isVisible={!!store.songToEdit} editSongCallback={editSongCallback} cancelEditSongCallback={cancelEditSongCallback} />
        </>
    )
}

export default PlaylistCards;