import React from "react";
import JoingLogo from '../../assets/Logo_joing2.png';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const JoinCompletion: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <Logo src={JoingLogo} alt="Project Logo" />
            <LogoTitle>Joing</LogoTitle>
            <Title>회원가입이 완료되었습니다</Title>
            <OkayButton onClick={() => navigate("/")}>확인</OkayButton>
        </>
    );
}

export default JoinCompletion;

const Logo = styled.img`
    width: 20rem;
    height: auto;
    margin-top: 3rem;

    @media (max-width: 768px) {
        width: 18rem;
    }

    @media (max-width: 480px) {
        width: 16rem;
    }
`;

const LogoTitle = styled.h1`
    font-family: 'SaenggeoJincheon', serif;
    letter-spacing: -0.03em;
    font-size: 2.5rem;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.9rem;
    }
`;

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    margin: 3rem;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const OkayButton = styled.button`
    padding: 6px 15px;
    width: 100px;
    height: 40px;
    background-color: #000000;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3e3e3e;
        border: none;
    }

    @media (max-width: 768px) {
        width: 90px;
        height: 35px;
        font-size: 14px;
    }

    @media (max-width: 480px) {
        width: 80px;
        height: 30px;
        font-size: 12px;
    }
`;
