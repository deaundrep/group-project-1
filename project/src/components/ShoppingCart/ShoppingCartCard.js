import React, { useState, useEffect } from "react";
import "./ShoppingCartCard.css";
import ShoppingCartVehicle from "./ShoppingCartVehicle";

export default function ShoppingCartCard(props) {
	return (
		<div>
			<table className="cart-table">
				<tbody>
					<tr>
						<th>Make</th>
						<th>Model</th>
						<th>Price</th>
						<th>Quantity</th>
					</tr>

					{props.cart.map((e) => (
						<ShoppingCartVehicle
							id={e.id}
							make={e.make}
							model={e.model}
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
				</tbody>
			</table>
		</div>
	);
}
