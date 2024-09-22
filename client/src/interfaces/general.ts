import { Item } from "./item";

export interface Children {
	children: React.ReactNode;
}

export interface OfferModalProps {
	item: Item;
	isOpen: boolean;
	onClose: () => void;
}

export interface ModalOverlayProps {
	isOpen: boolean;
}
