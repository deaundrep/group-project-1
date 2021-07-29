import React from 'react'
import './AddVehicleCard.css'

export default function AddVehicleCard(props) {
    return (
        <div className="add-vehicle-card">
            <form onSubmit={props.addVehicleFunc}>
            <h2><u>Add Video Vehicle</u></h2>
            <label htmlFor="title-field">Title: </label>
            <input 
                id="title-field" 
                type="text" 
                ref={props.addTitleRef}>
            </input><br />
            <label htmlFor="publisher-field">Publisher: </label>
            <input 
                id="publisher-field" 
                type="text" 
                ref={props.addPublisherRef}>
            </input><br />
            <label htmlFor="price-field">Price: </label>
            <input 
                id="price-field" 
                type="text" 
                ref={props.addPriceRef}>
            </input><br />
            
            <button type='submit'>+Add Vehicle+</button>
            </form>
            <button onClick={props.resetFunc}>Reset</button>
            
        </div>
    )
}