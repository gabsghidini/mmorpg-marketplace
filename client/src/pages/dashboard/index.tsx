import { useContext } from "react";
import { PlayerContext } from "../../context/Players.context";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
	const { player } = useContext(PlayerContext);
	const navigate = useNavigate();

	const handleSwitchPlayer = () => {
		navigate("/");
	};

	return (
		<S.Container>
			<S.DashboardContainer>
				<S.VBox>
					<S.HBox>
						<S.ItemsList>
							<h3>Items:</h3>
							<ul>
								{/* {items.map((item, index) => (
						<li key={index}>
							{item.amount}x {item.name}
						</li>
					))} */}
							</ul>
							<S.SearchInput
								type="text"
								placeholder="Search..."
							/>
						</S.ItemsList>

						<S.OffersContainer>
							<h3>Sell Offers:</h3>
							<S.OfferTable>
								<thead>
									<tr>
										<th>Name</th>
										<th>Amount</th>
										<th>Price Per Unit</th>
										<th>Total Price</th>
										<th>Ends At</th>
									</tr>
								</thead>
								<tbody>
									{/* {sellOffers.map((offer, index) => (
							<tr key={index}>
								<td>{offer.name}</td>
								<td>{offer.amount}</td>
								<td>{offer.pricePerUnit.toLocaleString()}</td>
								<td>{offer.totalPrice.toLocaleString()}</td>
								<td>{offer.endsAt}</td>
							</tr>
						))} */}
								</tbody>
							</S.OfferTable>

							<h3>Buy Offers:</h3>
							<S.OfferTable>
								<thead>
									<tr>
										<th>Name</th>
										<th>Amount</th>
										<th>Price Per Unit</th>
										<th>Total Price</th>
										<th>Ends At</th>
									</tr>
								</thead>
								<tbody>
									{/* {buyOffers.map((offer, index) => (
							<tr key={index}>
								<td>{offer.name}</td>
								<td>{offer.amount}</td>
								<td>{offer.pricePerUnit.toLocaleString()}</td>
								<td>{offer.totalPrice.toLocaleString()}</td>
								<td>{offer.endsAt}</td>
							</tr>
						))} */}
								</tbody>
							</S.OfferTable>
						</S.OffersContainer>
					</S.HBox>
					<S.Footer>
						<p>Gold: {player.gold}</p>
						<S.Button onClick={handleSwitchPlayer}>
							Switch Player
						</S.Button>
						<S.Button>Create Offer</S.Button>
					</S.Footer>
				</S.VBox>
			</S.DashboardContainer>
		</S.Container>
	);
};

export default Dashboard;
