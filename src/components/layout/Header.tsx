import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import {useNavigate} from "react-router-dom";
import LogoImg from "../../assets/Logo_joing2.png";
import '../../styles/fonts.css';
import iconNotification from "../../assets/icons/icon_notification.png";
import iconFillNotification from "../../assets/icons/icon_notification_fill.png";
import iconProfile from "../../assets/icons/icon_profile.png";
import iconLogout from "../../assets/icons/icon_logout.png";
import {logout} from "../../services/authService.ts";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {useUser} from "../../contexts/UserContext.tsx";

interface HeaderProps {
    onLoginClick: () => void;
    onNoticeClick: () => void;
    isNoticeModalOpen: boolean;
    unreadMessages: number;
    isShaking: boolean;
}

const Header: React.FC<HeaderProps> = ({onLoginClick, onNoticeClick, isNoticeModalOpen, unreadMessages, isShaking}) => {
    const navigate = useNavigate();
    const {accessToken} = useAuth();
    const {role} = useUser();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <HeaderContainer>
            <Content>
                <Logo
                    onClick={() => {
                        localStorage.removeItem("activeTab");
                        navigate("/");
                    }}
                >
                    <img src={LogoImg} alt="arrow icon"/>
                    Joing
                </Logo>
                {accessToken ? (
                    <ButtonGroup>
                        {role && (
                            <>
                                <NoticeButton onClick={onNoticeClick} isShaking={isShaking}>
                                    <img src={isNoticeModalOpen ? iconFillNotification : iconNotification}
                                         alt="Notice icon"/>
                                    {unreadMessages > 0 && <NotificationDot/>}
                                </NoticeButton>
                                <Button onClick={() => navigate("/mypage")}>
                                    <img src={iconProfile} alt="profile icon"/>
                                </Button>
                            </>
                        )}
                        <Button onClick={handleLogout}>
                            <img src={iconLogout} alt="logout icon"/>
                        </Button>
                    </ButtonGroup>
                ) : (
                    <Button onClick={onLoginClick}>Login</Button>
                )}
            </Content>
        </HeaderContainer>
    );
};

export default Header;

const shakeAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }
    10% {
        transform: rotate(45deg);
    }
    20% {
        transform: rotate(-45deg);
    }
    30% {
        transform: rotate(30deg);
    }
    40% {
        transform: rotate(-30deg);
    }
    50% {
        transform: rotate(10deg);
    }
    60% {
        transform: rotate(-10deg);
    }
    70% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

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

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const Logo = styled.div`
    font-family: 'SaenggeoJincheon', serif;
    letter-spacing: -0.03em;
    font-size: 1.8rem;
    font-weight: bold;
    color: black;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    img {
        width: 3rem;
        height: auto;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        img {
            width: 2.2rem;
        }
    }

    @media (max-width: 480px) {
        font-size: 1.25rem;
        img {
            width: 1.8rem;
        }
    }
`;

const Button = styled.button`
    font-family: 'SUITE-Regular', serif;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;

    &:hover {
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
    }

    img {
        width: 1.5rem;
        height: auto;
    }

    @media (max-width: 768px) {
        font-size: 0.9rem;
        img {
            width: 1.25rem;
        }
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        img {
            width: 1.1rem;
        }
    }
`;

const NoticeButton = styled.button<{ isShaking: boolean }>`
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
    }

    &:focus {
        outline: none;
    }

    img {
        width: 1.5rem;
        height: auto;
        animation: ${({isShaking}) =>
                isShaking
                        ? css`${shakeAnimation} 1s infinite`
                        : "none"};
    }

    @media (max-width: 768px) {
        img {
            width: 1.25rem;
        }
    }

    @media (max-width: 480px) {
        img {
            width: 1.1rem;
        }
    }
`;

const NotificationDot = styled.div`
    position: absolute;
    top: 4px;
    right: 12px;
    width: 8px;
    height: 8px;
    background-color: #ff3d3d;
    border-radius: 50%;

    @media (max-width: 768px) {
        top: 2px;
        right: 10px;
        width: 6px;
        height: 6px;
    }

    @media (max-width: 480px) {
        top: 1px;
        right: 8px;
        width: 4px;
        height: 4px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        gap: 0.5rem;
    }

    @media (max-width: 480px) {
        gap: 0;
    }
`;
