import React from "react";
import styled from "styled-components";

interface TabProps{
    label: string;
    isActive: boolean;
    onClick: (label: string) => void;
}

const Tab: React.FC<TabProps> = ({label, isActive, onClick}) => {
    const handleClick = () => {
        onClick(label);
    };

    return (
        <TabButton
            isActive={isActive}
            onClick={handleClick}
        >
            {label}
        </TabButton>
    );
};

export default Tab;

const TabButton = styled.button<{ isActive: boolean }>`
    background: none;
    border: none;
    border-radius: 0;
    font-size: 1rem;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    color: ${({ isActive }) => (isActive ? '#000' : '#777')};
    padding: 10px 0;
    cursor: pointer;
    border-bottom: ${({ isActive }) => (isActive ? '3px solid #000' : '3px solid transparent')};
    
    &:hover {
        color: #000;
    }
    
    &:focus{
        outline: none;
    }
`;
