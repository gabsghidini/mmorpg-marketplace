import { useState } from "react";
import * as S from "./styles";
import * as i from "../../interfaces/general";

const OfferModal = ({ item, isOpen, onClose }: i.OfferModalProps) => {
	const [pricePerUnit, setPricePerUnit] = useState<number>(0);
	const [amount, setAmount] = useState<number>(0);
	const [endsAt, setEndsAt] = useState<string>(
		new Date().toISOString().split("T")[0]
	);
	const [offerType, setOfferType] = useState<string>("Buy");

	const totalPrice = pricePerUnit * amount;

	return (
		<S.ModalOverlay isOpen={isOpen}>
			<S.ModalContent>
				<h3>Item: {item.name}</h3>
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
							value="Buy"
							checked={offerType === "Buy"}
							onChange={() => setOfferType("Buy")}
						/>
						Buy
					</label>
					<label>
						<input
							type="radio"
							value="Sell"
							checked={offerType === "Sell"}
							onChange={() => setOfferType("Sell")}
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
						onClick={() => {
							console.log("Create Offer");
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
