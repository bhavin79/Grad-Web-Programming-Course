import React from "react";

export const MyModal = ({CustomForm, closeFormFunction})=>{

    return(
        <>
        <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Add</button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={closeFormFunction}>✕</button>
            </form>
            <div>
            <CustomForm/>
            </div>
        </div>
        </dialog>
        </>
    )

}