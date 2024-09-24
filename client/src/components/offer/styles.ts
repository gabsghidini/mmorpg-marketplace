import styled from "styled-components";
import { ModalOverlayProps } from "../../interfaces/general";

export const ModalOverlay = styled.div<ModalOverlayProps>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;

export const ModalContent = styled.div`
	background: white;
	padding: 20px;
	border-radius: 10px;
	min-width: 300px;
`;

export const InputField = styled.input`
	width: 100%;
	padding: 5px;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
`;

export const RadioGroup = styled.div`
	display: flex;
	justify-content: space-around;
	margin-bottom: 10px;
`;

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
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

	&:first-child {
		background-color: #d9534f;
		&:hover {
			background-color: #c9302c;
		}
	}
`;
