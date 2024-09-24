import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../context/General.context";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import OfferModal from "../../components/offer";
import { Item } from "../../interfaces/item";
import { Player } from "../../interfaces/player";
import { Offer } from "../../interfaces/offer";
import { Inventory, ModifiedInventory } from "../../interfaces/inventory";
import toast from "react-hot-toast";

const Dashboard = () => {
	const { player, setPlayer, itemList, offerList } =
		useContext(GeneralContext);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [item, setItem] = useState({} as ModifiedInventory);
	const [allItemsList, setAllItemsList] = useState([] as ModifiedInventory[]);
	const [filteredItemsList, setFilteredItemsList] = useState(allItemsList);
	const [isLoading, setIsLoading] = useState(true);
	const [sellOffers, setSellOffers] = useState([] as Offer[]);
	const [buyOffers, setBuyOffers] = useState([] as Offer[]);
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		handleItemsForPlayer();
		handleOffers();
	}, [player, offerList]);

	const handleSwitchPlayer = () => {
		setPlayer({} as Player);
		navigate("/");
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.target.value;
		const filteredItems = allItemsList.filter((item) => {
			return item.itemName.toLowerCase().includes(search.toLowerCase());
		});

		if (search === "") {
			setFilteredItemsList(allItemsList);
			return;
		}

		setFilteredItemsList(filteredItems);
	};

	const handleItemsForPlayer = () => {
		const existingItems = player.inventory.map((inv: Inventory) => ({
			inventoryId: inv.id,
			itemId: inv.item.id,
			quantity: inv.quantity,
			itemName: inv.item.name,
		}));

		// Adiciona itens que não estão no inventário, com quantidade 0
		const fullItemList = itemList.map((item) => {
			const existingItem = existingItems.find(
				(existing) => existing.itemId === item.id
			);
			if (existingItem) {
				return existingItem;
			} else {
				return {
					inventoryId: null,
					itemId: item.id,
					quantity: 0,
					itemName: item.name,
				};
			}
		});

		fullItemList.sort((a, b) => a.itemName.localeCompare(b.itemName));

		setAllItemsList(fullItemList);
		setFilteredItemsList(fullItemList);
		setIsLoading(false);
	};

	const handleOffers = () => {
		const sellOffers = offerList
			.filter((offer) => offer.type === "sell")
			.sort((a, b) => a.pricePerUnit - b.pricePerUnit);
		const buyOffers = offerList
			.filter((offer) => offer.type === "buy")
			.sort((a, b) => b.pricePerUnit - a.pricePerUnit);

		setSellOffers(sellOffers);
		setBuyOffers(buyOffers);
	};

	return isLoading ? (
		<S.Container>
			<S.DashboardContainer>
				<h1>Loading...</h1>
			</S.DashboardContainer>
		</S.Container>
	) : (
		<S.Container>
			<S.DashboardContainer>
				<S.VBox>
					<S.HBox>
						<S.ItemsList>
							<h3>Items:</h3>
							<S.SearchInput
								onChange={handleSearch}
								type="text"
								placeholder="Search..."
							/>
							<S.UnorderedList>
								{filteredItemsList.map((item, index) => (
									<li key={index}>
										<S.ItemButton
											selected={
												item.itemId === selectedItemId
											}
											onClick={() => {
												if (
													selectedItemId ===
													item.itemId
												) {
													setSelectedItemId(null);
													setItem(
														{} as ModifiedInventory
													);
													return;
												}

												setSelectedItemId(item.itemId);
												setItem(item);
											}}
										>
											{item.quantity}x {item.itemName}
										</S.ItemButton>
									</li>
								))}
							</S.UnorderedList>
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
									{sellOffers.map((offer, index) => (
										<tr key={index}>
											<td data-head="Nickname">
												{offer.playerNickname}
											</td>
											<td data-head="Amount">
												{offer.quantity}
											</td>
											<td data-head="Price Per Unit">
												{offer.pricePerUnit.toLocaleString()}
											</td>
											<td data-head="Total Price">
												{offer.totalPrice.toLocaleString()}
											</td>
											<td data-head="Ends At">
												{new Date(
													offer.endDate
												).toLocaleDateString()}
											</td>
										</tr>
									))}
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
									{buyOffers.map((offer, index) => (
										<tr key={index}>
											<td data-head="Nickname">
												{offer.playerNickname}
											</td>
											<td data-head="Amount">
												{offer.quantity}
											</td>
											<td data-head="Price Per Unit">
												{offer.pricePerUnit.toLocaleString()}
											</td>
											<td data-head="Total Price">
												{offer.totalPrice.toLocaleString()}
											</td>
											<td data-head="Ends At">
												{new Date(
													offer.endDate
												).toLocaleDateString()}
											</td>
										</tr>
									))}
								</tbody>
							</S.OfferTable>
						</S.OffersContainer>
					</S.HBox>
					<S.Footer>
						<p>Gold: {player.gold}</p>
						<S.Button onClick={handleSwitchPlayer}>
							Switch Player
						</S.Button>
						<S.Button
							onClick={() => {
								if (!selectedItemId) {
									return toast.error(
										"Please select an item to create an offer."
									);
								}
								setIsModalOpen(true);
							}}
						>
							Create Offer
						</S.Button>
					</S.Footer>
				</S.VBox>
			</S.DashboardContainer>
			<OfferModal
				isOpen={isModalOpen}
				item={item}
				onClose={handleModalClose}
			/>
		</S.Container>
	);
};

export default Dashboard;
