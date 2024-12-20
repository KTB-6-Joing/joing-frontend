import React from 'react';
import styled from 'styled-components';

interface RecordBoxProps {
    id: number;
    title: string;
    summary: string;
    onViewDetails: (id: number) => void;
}

const RecordBox: React.FC<RecordBoxProps> = ({id, title, summary, onViewDetails}) => {
    return (
        <BoxContainer>
            <TextContainer onClick={() => onViewDetails(id)}>
                <Title>{title}</Title>
                <Summary>{summary}</Summary>
            </TextContainer>
        </BoxContainer>
    );
};

export default RecordBox;

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
    flex-direction: column;
    gap: 0.5rem;
`;

const Title = styled.h4`
    font-size: 1rem;
    margin: 0;
    font-weight: 600;
`;

const Summary = styled.p`
    font-size: 14px;
    color: #6c6c6c;
    margin: 0;
`;
