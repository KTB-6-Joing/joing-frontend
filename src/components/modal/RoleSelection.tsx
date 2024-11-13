import React from "react";
import styled from "styled-components";
import iconCreator from "../../assets/icons/icon_creator.png";
import iconPlanner from "../../assets/icons/icon_planner.png";

interface RoleSelectionProps {
    onSelectCreator: () => void;
    onSelectPlanner: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectCreator, onSelectPlanner }) => {
    return (
        <>
            <Title>회원가입</Title>
            <RoleSelect>
                <Box onClick={onSelectCreator}>
                    <img src={iconCreator} alt="Creator icon"/>
                    <RoleText>크리에이터</RoleText>
                </Box>
                <Box onClick={onSelectPlanner}>
                    <img src={iconPlanner} alt="Planner icon"/>
                    <RoleText>기획자</RoleText>
                </Box>
            </RoleSelect>
        </>
    );
}

export default RoleSelection;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 60px;
    text-align: center;
`;

const RoleSelect = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 150px;
    padding: 10px;
    background-color: #f9f9f9;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    &:hover {
        background-color: #ececec;
        border-color: #ccc;
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    img {
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
`;

const RoleText = styled.span`
    font-size: 18px;
    font-weight: 500;
    color: #333;
`;
