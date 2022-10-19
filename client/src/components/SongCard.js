import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index, onDoubleClick } = props;
    const [isDragging, setIsDragging] = useState(false)
    const [draggedTo, setDraggedTo] = useState(false)


    let cardClass = "list-card unselected-list-card";

    const handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        setIsDragging(true)
    }

    const handleDragOver = (event) => {
        event.preventDefault();
        setDraggedTo(true)
    }

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDraggedTo(true)
    }

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDraggedTo(false)
    }

    const handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        if (!targetId.startsWith("song-")) { return } //prevents case where program crashes with an undefined target
        targetId = targetId.substring(target.id.indexOf("-") + 1, targetId.indexOf("-card"));
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1, sourceId.indexOf("-card"));

        setIsDragging(false)
        setDraggedTo(false)


        if (sourceId === targetId) { return } //avoid case where we move a song to itself
        const transaction = new MoveSong_Transaction(store, sourceId, targetId)
        store.addTransaction(transaction)
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDoubleClick={onDoubleClick}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={() => store.markSongForDeletion(song)}
            />
        </div>
    );
}

export default SongCard;