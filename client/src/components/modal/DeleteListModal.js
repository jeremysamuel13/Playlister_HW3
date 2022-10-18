import React, { useContext } from 'react';
import { GlobalStoreContext } from '../../store'



const DeleteListModal = ({ isVisible, deleteListCallback, hideDeleteListModalCallback }) => {
    const { store } = useContext(GlobalStoreContext);

    return (
        <div
            className={`modal${isVisible ? " is-visible" : ""}`}
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the <b>{store.deleteList?.name}</b> playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="delete-list-confirm-button"
                        className="modal-button"
                        onClick={() => deleteListCallback(store.deleteList?._id)}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        className="modal-button"
                        onClick={hideDeleteListModalCallback}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal