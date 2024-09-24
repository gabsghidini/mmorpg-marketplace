import styled from "styled-components";
import backgroundImage from "../../assets/bg.webp";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;

	background-image: url(${backgroundImage});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
`;

export const VBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	width: 100%;
	height: 100%;
`;

export const HBox = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
	height: 100%;

	@media screen and (max-width: 320px) {
		flex-direction: column;
	}
`;

export const DashboardContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border: 1px solid #d6d6d6;
	border-radius: 10px;
	background-color: #f9f9f9;
	width: 80%;
	height: 80%;

	@media screen and (max-width: 320px) {
		flex-direction: column;
		height: 100%;
	}
`;

export const ItemsList = styled.div`
	flex: 1;
	margin-right: 20px;
	height: 80%;
`;

export const OffersContainer = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

export const OfferTable = styled.table`
	width: 100%;
	margin-bottom: 20px;
	max-width: 100%;

	table {
		width: 100%;
		max-width: fit-content;
	}

	th,
	td {
		border: 1px solid #ccc;
		padding: 8px;
		text-align: left;
	}

	@media screen and (max-width: 320px) {
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
		overflow-y: scroll;
		max-height: 200px;

		table,
		thead,
		tr {
			display: none;
		}

		table,
		tr {
			display: block;
		}

		table th,
		table td {
			padding: 0;
		}

		td {
			display: block;
			text-align: left;
			font-size: 0.75rem;
		}

		td::before {
			content: attr(data-head) ": ";
		}
	}
`;

export const SearchInput = styled.input`
	margin-top: 10px;
	padding: 5px;
	width: 100%;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

export const Footer = styled.div`
	margin-top: 20px;
	display: flex;
	width: 100%;
	justify-content: space-between;

	@media screen and (max-width: 320px) {
		flex-direction: column;
		gap: 0.25rem;
	}
`;

export const Button = styled.button`
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	background-color: #5cb85c;
	color: #fff;
	cursor: pointer;

	&:hover {
		background-color: #4cae4c;
	}
`;

export const UnorderedList = styled.ul`
	list-style-type: none;
	padding: 0;
	width: 100%;
	height: 100%;
	border: 1px solid #4cae4c;
	margin: 1rem 0;

	max-height: fit-content;
`;

export const ItemButton = styled.button<{ selected: boolean }>`
	background-color: ${({ selected }) => (selected ? "#d3d3d3" : "white")};
	border: 1px solid #ccc;
	padding: 10px;
	width: 100%;
	text-align: left;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ selected }) =>
			selected ? "#b0b0b0" : "#f0f0f0"};
	}
`;
