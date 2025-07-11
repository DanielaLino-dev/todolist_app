import React from "react";

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}

const ModalNewTask = ({ modalOpen, setModalOpen, children }: ModalProps) => {

    return (

        <dialog id="my_modal_3" className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box flex flex-col gap-3.5">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setModalOpen(false)}>✕</button>
                {children}
            </div>
        </dialog>

    )
}
export default ModalNewTask;