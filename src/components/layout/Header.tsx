import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
    const handleLoginClick = () => {
        console.log('Login button clicked');
    };

    return (
        <HeaderContainer>
            <Logo>Joing</Logo>
            <Button onClick={handleLoginClick}>Login</Button>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 1000;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: black;
`;

const Button = styled.button`
    border: none;
    font-size: 16px;
    cursor: pointer;
    background-color: white;
    
    &:hover {
    background-color: #ff5d5d;
    }
`;
