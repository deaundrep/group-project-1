import React, { useState, useRef, useEffect } from 'react'
import './VehicleCard.css'

export default function VehicleCard(props) {

    const [editBtn, setEditBtn] = useState(false)

    const editMakeRef = useRef()
    const editModelRef = useRef()
    const editPriceRef = useRef()


    const editVehicleCard = (e) => {
        e.preventDefault()
        let editVehicleObj = {
            make: editMakeRef.current.value,
            model: editModelRef.current.value,
            price: editPriceRef.current.value,
            id: props.id
        }
        props.editVehicle(editVehicleObj)
        setEditBtn(false)
    }

    return (
        <div className="Vehicle-card-div">

            {
                editBtn ? (
                    <div>
                        <form onSubmit={editVehicleCard}>
                            <label htmlFor="make">make: </label>
                            <input
                                type='text'
                                name="make"
                                ref={editMakeRef}
                                placeholder={props.make}
                            /><br />
                            <label htmlFor="Model">Model: </label>
                            <input
                                type='text'
                                name="Model"
                                ref={editModelRef}
                                placeholder={props.Model}
                            /><br />
                            <label htmlFor="price">Price: </label>
                            <input
                                type='text'
                                name="price"
                                ref={editPriceRef}
                                placeholder={props.price}
                            /><br />
                            <button type='submit'>Submit Changes</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2><u>{props.make}</u></h2>
                        <p>Model: {props.model}</p>
                        <p>Price: {props.price}</p>
                    </div>
                )
            }
            <button onClick={() => setEditBtn(prev => !prev)}>Edit</button>

            <button
                onClick={() => props.deleteVehicle(props.id)}
            >Delete Me!</button>
        </div>
    )
}
