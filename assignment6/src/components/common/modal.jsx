import React from "react";

export const MyModal = ({CustomForm, buttonName, data, modalName, setReload})=>{
    console.log(modalName);
    return(
        <>
       
       {modalName&&  <div>
        <button className="btn" onClick={()=>document.getElementById(modalName).showModal()}>{buttonName}</button>
        <dialog id={modalName} className="modal">
        <div className="modal-box">
            <form method="dialog">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
            </form>
            <div>
            <CustomForm data={data} setReload = {setReload} />
            </div>
        </div>
        </dialog>
        </div>}
        </>
    )

}