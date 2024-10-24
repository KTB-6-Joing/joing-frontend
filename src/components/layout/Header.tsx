import React from 'react';
import styled from 'styled-components';

const Header: React.FC = () => {
    const handleLoginClick = () => {
        console.log('Login button clicked');
    };

    return (
        <HeaderContainer>
            <Content>
                <Logo>Joing</Logo>
                <Button onClick={handleLoginClick}>Login</Button>
            </Content>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    z-index: 1000;
    background-color: white;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.05);

`;

const Content = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;

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
