import React from "react";

export const MyModal = ({CustomForm, buttonName, data, modalName})=>{
    console.log(modalName);
    let btnStyle = "btn bg-gray-800 text-gray-50 hover:bg-gray-900 hover:text-white "
    if(buttonName == "Add"){
        btnStyle += "px-10 rounded-full"
    }
    return(
        <>
       
       {modalName&&  <div>
        <button className={`${btnStyle}`} onClick={()=>document.getElementById(modalName).showModal()}>{buttonName}</button>
        <dialog id={modalName} className="modal">
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
            </form>
            <div>
            <CustomForm data={data}/>
            </div>
        </div>
        </dialog>
        </div>}
        </>
    )

}