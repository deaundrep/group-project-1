import React, { useState } from "react";
import "./ShoppingCartCard.css";

export default function ShoppingCartVehicle(props) {
	// const initialValue = props.quantity
	// const [qtyState, setQtyState] = useState(initialValue)

	return (
		<tr>
			<td>{props.make}</td>
			<td>{props.model}</td>
			<td>{props.price}</td>
			{/* <td>
                    Current: {props.quantity}
                </td> */}
			<td>
				<input
					style={{ width: "38px" }}
					type="number"
					// value={qtyState}
					// onChange={(e) => setQtyState(parseInt(e.target.value))}
					value={props.quantity}
					onChange={(e) => props.updateQty(props.id, parseInt(e.target.value))}
				/>
			</td>
			{/* <button onClick={() => props.updateQty(props.id, qtyState)}>Update</button> */}
			<td>
				<button onClick={() => props.removeFromCart(props.id)}>Remove</button>
			</td>
		</tr>
	);
}
