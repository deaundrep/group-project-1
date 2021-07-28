import React, { useState, useEffect } from "react";
import "./ShoppingCartCard.css";
import ShoppingCartVehicle from "./ShoppingCartVehicle";

export default function ShoppingCartCard(props) {
	return (
		<div>
			<table>
				<tr>
					<th>Make</th>
					<th>Model</th>
					<th>Quantity</th>
				</tr>

				{props.cart.map((e) => (
					<ShoppingCartVehicle
						id={e.id}
						make={e.make}
						price={e.price}
						quantity={e.quantity}
						removeFromCart={props.removeFromCart}
						updateQty={props.updateQty}
					/>
				))}
				<tr>
					<td>
						<strong>Cart Total: </strong>
					</td>
					<td>${props.total}</td>
				</tr>
			</table>
		</div>
	);
}
