import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deleteDoctor, refetch }) => {
    const { name, email } = deleteDoctor;
    const deleteHandle = () => {
        fetch(`http://localhost:5000/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Successfully Deleted')
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="delete-confirmation" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-600">Are you sure, You want to delete {name}.?</h3>
                    <p className="py-4">If you delete, it can not be undone.</p>
                    <div className="modal-action">
                        <label onClick={deleteHandle} htmlFor="delete-confirmation" className="btn btn-sm btn-error">Delete</label>
                        <label htmlFor="delete-confirmation" className="btn btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteConfirmModal;