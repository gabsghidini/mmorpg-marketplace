import { useContext, useState } from "react";
import * as S from "./styles";
import * as i from "../../interfaces/general";
import { GeneralContext } from "../../context/General.context";
import { Offer } from "../../interfaces/offer";
import toast from "react-hot-toast";

const OfferModal = ({ item, isOpen, onClose }: i.OfferModalProps) => {
	const { player, createOffer } = useContext(GeneralContext);
	const [pricePerUnit, setPricePerUnit] = useState<number>(0);
	const [amount, setAmount] = useState<number>(0);
	const [endsAt, setEndsAt] = useState<string>(
		new Date().toISOString().split("T")[0]
	);
	const [offerType, setOfferType] = useState<string>("buy");

	const totalPrice = pricePerUnit * amount;

	const handleCreateOffer = async () => {
		const offer: Offer = {
			item: item,
			pricePerUnit: Math.floor(pricePerUnit),
			quantity: amount,
			endDate: new Date(endsAt).toISOString().split("T")[0],
			type: offerType,
		};

		if (offerType === "buy" && totalPrice > player.gold) {
			toast.error("You do not have enough gold to make this offer.");
			return;
		}

		if (offerType === "sell") {
			const itemInInventory = player.inventory.find(
				(inventoryItem) => inventoryItem.itemId === item.itemId
			);

			if (!itemInInventory || itemInInventory.quantity < amount) {
				toast.error(
					"You do not have enough items in your inventory to make this offer."
				);
				return;
			}
		}
		await createOffer(offer, player.id);
	};

	return (
		<S.ModalOverlay isOpen={isOpen}>
			<S.ModalContent>
				<h3>Item: {item.itemName}</h3>
				<label>
					Price Per Unit:
					<S.InputField
						type="number"
						value={pricePerUnit}
						onChange={(e) =>
							setPricePerUnit(Number(e.target.value))
						}
					/>
				</label>
				<label>
					Amount:
					<S.InputField
						type="number"
						value={amount}
						onChange={(e) => setAmount(Number(e.target.value))}
					/>
				</label>
				<label>
					Ends At:
					<S.InputField
						type="date"
						value={endsAt}
						onChange={(e) => setEndsAt(e.target.value)}
					/>
				</label>
				<label>Offer Type:</label>
				<S.RadioGroup>
					<label>
						<input
							type="radio"
							value="buy"
							checked={offerType === "buy"}
							onChange={() => setOfferType("buy")}
						/>
						Buy
					</label>
					<label>
						<input
							type="radio"
							value="Sell"
							checked={offerType === "sell"}
							onChange={() => setOfferType("sell")}
						/>
						Sell
					</label>
				</S.RadioGroup>
				<p>Total Price: {totalPrice.toLocaleString()}</p>
				<S.ButtonGroup>
					<S.Button
						onClick={() => {
							onClose();
						}}
					>
						Cancel
					</S.Button>
					<S.Button
						onClick={async () => {
							await handleCreateOffer();
							onClose();
						}}
					>
						Create Offer
					</S.Button>
				</S.ButtonGroup>
			</S.ModalContent>
		</S.ModalOverlay>
	);
};

export default OfferModal;
