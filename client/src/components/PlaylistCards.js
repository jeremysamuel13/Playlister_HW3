import { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SongCard from './SongCard.js'
import { GlobalStoreContext } from '../store'
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

    return (
        <div id="playlist-cards">
            {
                store.currentList?.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))
            }
        </div>
    )
}

export default PlaylistCards;