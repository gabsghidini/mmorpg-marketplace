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

export const Box = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 30%;
	height: 30%;
	max-height: 20rem;
	background-color: rgba(255, 255, 255, 0.85);
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	gap: 1rem;

	@media (max-width: 768px) {
		width: 90%;
		height: 90%;
		max-height: 300px;
	}
`;

export const Title = styled.h1`
	font-size: calc(1.5rem + 1vw);
	font-weight: bold;
	width: 100%;
	text-align: center;

	@media (max-width: 768px) {
		font-size: 1rem;
	}
`;

export const Select = styled.select`
	width: 90%;
	padding: 0.5rem;
	border-radius: 0.25rem;

	&:focus {
		outline: 1px solid #ff8000;
		border: none;
	}
`;

export const Button = styled.button`
	width: 90%;
	padding: 0.5rem;
	border-radius: 0.25rem;
	border: none;
	background-color: #ff8000;
	color: #fff;
	font-weight: bold;
	cursor: pointer;

	&:hover {
		background-color: #ff6000;
	}
`;
