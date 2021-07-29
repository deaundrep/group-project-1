import VehicleCardValue from "./components/VehicleCard/VehicleCardValue";
import VehicleCardRef from "./components/VehicleCard/VehicleCardRef";
import AddVehicleCard from "./components/AddVehicle/AddVehicleCard";
import ShoppingCartCard from "./components/ShoppingCart/ShoppingCartCard";

import React, { useState, useEffect, useRef, useReducer } from "react";
import logo from "./logo.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
	const addMakeRef = useRef();
	const addModelRef = useRef();
	const addPriceRef = useRef();

	const vehicleReducer = (vehicleState, action) => {
		switch (action.type) {
			case "ADD_VEHICLE":
				action.data.e.preventDefault();
				let newVehicle = {
					make: addMakeRef.current.value,
					model: addModelRef.current.value,
					price: addPriceRef.current.value,
					id: uuidv4(),
				};
				setShowAddCard(!action.data.showAddCard);

				return [newVehicle, ...vehicleState];

			case "EDIT_VEHICLE":
				let stateCopy = vehicleState.map((e) =>
					e.id === action.data.id ? action.data : e
				);
				return stateCopy;

			case "DELETE_VEHICLE":
				let newArr = vehicleState.filter((e) =>
					e.id === action.id ? false : true
				);
				return newArr;

			default:
				console.log("!@-------REDUCER_ERROR-------@!");
		}
	};

	const cartReducer = (state, action) => {
		switch (action.type) {
			case "ADD":
				let isNew = true;
				if (state.length === 0) {
					return [
						{
							make: action.data.make,
							model: action.data.price,
							id: action.data.id,
							quantity: 1,
						},
					];
				}

				let newCart = state.map((e) => {
					if (e.id === action.data.id) {
						isNew = false;
						return {
							make: e.make,
							price: e.price,
							id: e.id,
							quantity: e.quantity + 1,
						};
					} else {
						return e;
					}
				});

				if (isNew) {
					newCart.push({
						make: action.data.make,
						price: action.data.price,
						id: action.data.id,
						quantity: 1,
					});
				}
				return newCart;

			case "UPDATE_QTY":
				console.log("!@-------update-------@!");
				console.log(action.data);
				let newQty = state.map((e) => {
					if (e.id === action.data.id) {
						return {
							make: e.make,
							price: e.price,
							id: e.id,
							quantity: action.data.quantity,
						};
					} else {
						return e;
					}
				});
				return newQty;

			case "DELETE":
				let removeCart = state.filter((e) =>
					e.id === action.data ? false : true
				);
				return removeCart;

			default:
				console.log("!@-------Cart Reducer is Broken-------@!");
		}
	};

	let initialVehicleState = [
		{
			make: "toyota",
			model: "rav4",
			price: 30000,
			id: uuidv4(),
		},
		{
			make: "toyota",
			model: "camry",
			price: 25000,
			id: uuidv4(),
		},
		{
			make: "toyota",
			model: "tacoma",
			price: 45000,
			id: uuidv4(),
		},
		{
			make: "toyota",
			model: "4runner",
			price: 50000,
			id: uuidv4(),
		},
		{
			make: "toyota",
			model: "tundra",
			price: 60000,
			id: uuidv4(),
		},
	];

	const [showAddCard, setShowAddCard] = useState(false);
	const [vehicleState, vehicleDispatch] = useReducer(
		vehicleReducer,
		initialVehicleState
	);
	const [cartState, cartDispatch] = useReducer(cartReducer, []);
	const [totalState, setTotalState] = useState(0);

	useEffect(() => {
		let newTotal = cartState.reduce((acc, e) => acc + e.price * e.quantity, 0);
		setTotalState(newTotal);
	}, [cartState]);

	return (
		<div className="App">
			<ShoppingCartCard
				cart={cartState}
				total={totalState}
				removeFromCart={(id) =>
					cartDispatch({
						type: "DELETE",
						data: id,
					})
				}
				updateQty={(id, quantity) =>
					cartDispatch({
						type: "UPDATE_QTY",
						data: {
							id: id,
							quantity: quantity,
						},
					})
				}
			/>
			<p>-------------------------</p>

			<h1>
				<u>Vehicle Store</u>
			</h1>
			<button onClick={() => setShowAddCard((prev) => !prev)}>
				{showAddCard ? "Hide Add Card" : "Show Add Card"}
			</button>
			{showAddCard && (
				<AddVehicleCard
					addVehicleFunc={(e) =>
						vehicleDispatch({
							type: "ADD_VEHICLE",
							data: {
								e: e,
								showAddCard: showAddCard,
							},
						})
					}
					addMakeRef={addMakeRef}
					addModelRef={addModelRef}
					addPriceRef={addPriceRef}
					resetFunc={() => {
						addMakeRef.current.value = "";
						addModelRef.current.value = "";
						addPriceRef.current.value = "";
					}}
				/>
			)}
			{vehicleState.map((e) => {
				return (
					<VehicleCardValue
						key={e.id}
						id={e.id}
						make={e.make}
						model={e.model}
						price={e.price}
						deleteVehicle={(id) =>
							vehicleDispatch({
								type: "DELETE_VEHICLE",
								id: id,
							})
						}
						editVehicle={(param) =>
							vehicleDispatch({
								type: "EDIT_VEHICLE",
								data: param,
							})
						}
						addToCart={(param) =>
							cartDispatch({
								type: "ADD",
								data: param,
							})
						}
					/>
				);
			})}
		</div>
	);
}

export default App;
