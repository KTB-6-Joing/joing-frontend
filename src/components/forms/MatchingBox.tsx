import React from 'react';
import styled from 'styled-components';
import {ItemStatus} from "../../constants/itemStatus.ts";

interface MatchingBoxProps {
    id: number;
    title: string;
    status: ItemStatus;
    onViewDetails: (id: number) => void;
}

const MatchingBox: React.FC<MatchingBoxProps> = ({id, title, status, onViewDetails}) => {
    return (
        <BoxContainer>
            <TextContainer onClick={() => onViewDetails(id)}>
                <Title>{title}</Title>
                <Status>{status}</Status>
            </TextContainer>
        </BoxContainer>
    );
};

export default MatchingBox;

const BoxContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #ffffff;
    border-radius: 12px;
    border: #e4e4e4 solid;

    &:hover {
        cursor: pointer;
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;
    }
`;

const TextContainer = styled.div`
    flex-grow: 1;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5rem;
`;

const Title = styled.h4`
    font-size: 1rem;
    margin: 0;
    font-weight: 600;
`;

const Status = styled.p`
    font-size: 14px;
    color: #6c6c6c;
    margin: 0;
`;
