import React from 'react';
import styled from 'styled-components';
import LogoImg from "../../assets/Logo_joing.png";
import '../../styles/fonts.css';
import {useUser} from '../../contexts/UserContext.tsx'
import iconMail from "../../assets/icons/icon_mail.png";
import iconProfile from "../../assets/icons/icon_profile.png";

interface HeaderProps {
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
    const { role } = useUser();

    return (
        <HeaderContainer>
            <Content>
                <Logo>
                    <img src={LogoImg} alt="arrow icon"/>
                    Joing
                </Logo>
                {role === null
                    ? <Button onClick={onLoginClick}>Login</Button>
                    : <ButtonGroup>
                        <Button>
                            <img src={iconMail} alt="arrow icon"/>
                        </Button>
                        <Button>
                            <img src={iconProfile} alt="arrow icon"/>
                        </Button>
                    </ButtonGroup>
                }

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
    font-family: 'SaenggeoJincheon', serif;
    letter-spacing: -0.03em;
    font-size: 28px;
    font-weight: bold;
    color: black;
    display: flex;
    align-items: center;
    gap: 8px;
    
    img{
        width: 44px;
        height: auto;
    }
`;

const Button = styled.button`
    font-family: 'SUITE-Regular', serif;
    border: none;
    font-size: 16px;
    cursor: pointer;
    background-color: white;

    &:hover {
        transform: scale(1.05);    
    }

    &:focus{
        outline: none;
    }

    img {
        width: 24px;
        height: 24px;
    }
`;

const ButtonGroup = styled.div`

`;
