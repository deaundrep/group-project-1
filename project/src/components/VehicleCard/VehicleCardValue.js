import React, { useState, useRef, useEffect } from "react";
import "./VehicleCard.css";

export default function VehicleCardValue(props) {
	const [editBtn, setEditBtn] = useState(false);
	const [vehicleCardState, setVehicleCardState] = useState({
		make: props.make,
		model: props.model,
		price: props.price,
		id: props.id,
	});
	const [disableBtn, setDisableBtn] = useState(false);

	const onChangeHandler = (e) => {
		setVehicleCardState({
			...vehicleCardState,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		vehicleCardState.make === "" ||
		vehicleCardState.model === "" ||
		vehicleCardState.price === ""
			? setDisableBtn(true)
			: setDisableBtn(false);
	}, [vehicleCardState]);

	const editVehicleCard = (e) => {
		e.preventDefault();
		let editVehicleObj = {
			make: vehicleCardState.make,
			model: vehicleCardState.model,
			price: vehicleCardState.price,
			id: vehicleCardState.id,
		};
		props.editVehicle(editVehicleObj);
		setEditBtn(false);
	};

	return (
		<div className="vehicle-card-div">
			{editBtn ? (
				<div>
					<form onSubmit={editVehicleCard}>
						<label htmlFor="make">make: </label>
						<input
							type="text"
							name="make"
							// ref={editMakeRef}
							value={vehicleCardState.make}
							onChange={onChangeHandler}
							placeholder={vehicleCardState.make}
						/>
						<br />
						<label htmlFor="model">model: </label>
						<input
							type="text"
							name="model"
							value={vehicleCardState.model}
							onChange={onChangeHandler}
							placeholder={vehicleCardState.model}
						/>
						<br />
						<label htmlFor="price">Price: </label>
						<input
							type="text"
							name="price"
							value={vehicleCardState.price}
							onChange={onChangeHandler}
							placeholder={vehicleCardState.price}
						/>
						<br />
						<button disabled={disableBtn} type="submit">
							Submit Changes
						</button>
					</form>
				</div>
			) : (
				<div>
					<h2>
						<u>{props.make}</u>
					</h2>
					<p>model: {props.model}</p>
					<p>Price: {props.price}</p>
				</div>
			)}

			<button onClick={() => props.addToCart(vehicleCardState)}>
				Add to Cart
			</button>

			<button onClick={() => setEditBtn((prev) => !prev)}>Edit</button>

			<button onClick={() => props.deleteVehicle(props.id)}>Delete Me!</button>
		</div>
	);
}
