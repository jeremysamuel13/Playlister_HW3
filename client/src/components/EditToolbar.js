import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
const DEFAULT_SONG = {
    title: "Untitled",
    artist: "Unknown",
    youTubeId: "dQw4w9WgXcQ"
}

function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    const modalOpen = store.songToDelete || store.songToEdit

    const canAddSong = !modalOpen && store.currentList !== null
    const canUndo = !modalOpen && store.hasUndo
    const canRedo = !modalOpen && store.hasRedo
    const canClose = !modalOpen && store.currentList !== null;

    let addSongClass = "playlister-button";
    let undoClass = "playlister-button";
    let redoClass = "playlister-button";
    let closeClass = "playlister-button";
    if (!canAddSong) addSongClass += " disabled";
    if (!canUndo) undoClass += " disabled";
    if (!canRedo) redoClass += " disabled";
    if (!canClose) closeClass += " disabled";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.listNameActive) {
        editStatus = true;
    }

    const handleAdd = () => {
        let transaction = new AddSong_Transaction(store, DEFAULT_SONG)
        store.addTransaction(transaction)
    }

    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!canAddSong}
                value="+"
                className={addSongClass}
                onClick={handleAdd}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!canUndo}
                value="⟲"
                className={undoClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!canRedo}
                value="⟳"
                className={redoClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!canClose}
                value="&#x2715;"
                className={closeClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;