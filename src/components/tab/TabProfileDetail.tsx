import React from 'react';
import styled from "styled-components";
import KakaoIcon from "../../assets/icons/icon_kakao.png";
import EmailIcon from "../../assets/icons/icon_email.png";
import PlayIcon from "../../assets/icons/icon_playbutton.png";
import {ProfileInfo} from "../../pages/Mypage.tsx";
import {Role} from "../../constants/roles.ts";

interface TabProfileDetailProps {
    role: Role | null;
    profileInfo: ProfileInfo;
}

const TabProfileDetail: React.FC<TabProfileDetailProps> = ({ role, profileInfo }) => {
    return (
        <ProfileDetail>
            <AccountBox>
                <AccountImg>
                    <img src={KakaoIcon} alt="kakao icon"/>
                </AccountImg>
                <InfoContainer>
                    <Title1>Kakao 계정으로 로그인 중이에요</Title1>
                </InfoContainer>
            </AccountBox>
            <AccountBox>
                <AccountImg>
                    <img src={EmailIcon} alt="email icon"/>
                </AccountImg>
                <InfoContainer>
                    <Title1>Contact Email</Title1>
                    <Title2>{profileInfo.email}</Title2>
                </InfoContainer>
                <EditButton>Edit</EditButton>
            </AccountBox>
            {role === Role.CREATOR && (
                <>
                    <CreatorAccountBoxHeader>
                        <Title>{profileInfo.nickname}'s Channel</Title>
                        <Detail>Connect your YouTube link</Detail>
                    </CreatorAccountBoxHeader>
                    <AccountBox>
                        <AccountImg>
                            <img src={PlayIcon} alt="Play icon" />
                        </AccountImg>
                        <InfoContainer>
                            <Title1>Youtube</Title1>
                            <Title2>{profileInfo.channelId || "No channel ID available"}</Title2>
                        </InfoContainer>
                        <a href={profileInfo.channelUrl || "#"} target="_blank" rel="noopener noreferrer">
                            <VisitButton>Visit</VisitButton>
                        </a>
                        <EditButton>Edit</EditButton>
                    </AccountBox>
                </>
            )}
            <WithdrawButton>회원탈퇴</WithdrawButton>
        </ProfileDetail>
    )
};

export default TabProfileDetail;

const ProfileDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 1rem;
`;

const AccountBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const AccountImg = styled.div`
    background-color: #f1f1f1;
    display: flex;
    padding: 1rem;
    margin: 0.7rem;
    border-radius: 10px;

    img {
        width: 24px;
    }
`;

const InfoContainer = styled.div`
    width: 100%;
`;

const Title1 = styled.label`
    font-family: 'SUITE-Bold', serif;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
    margin-top: 0;
    color: #333;
`;

const Title2 = styled.div`
    font-family: 'SUITE-Regular', serif;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
    margin-top: 0;
    color: #333;
`;

const EditButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    margin-right: 1rem;
    background-color: #f3f3f3;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #dadada;
        border: none;
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
    }
`;

const VisitButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    background-color: #f3f3f3;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, background-color 0.3s ease;

    &:hover {
        background-color: #dadada;
        border: none;
        transform: scale(1.1);
    }

    &:focus {
        outline: none;
    }
`;


const CreatorAccountBoxHeader = styled.div`
    width: 100%;
`;

const Title = styled.h2`
    font-family: 'SUITE-Bold';
    font-size: 1.3rem;
    margin-bottom: 0;
`;

const Detail = styled.p`
    font-family: 'SUITE-Regular';
    margin: 0;
`;

const WithdrawButton = styled.button`
    border: none;
    text-decoration: underline;
    background-color: transparent;
    color: #575757;
    margin-top: 2rem;

    &:hover {
        border: none;
    }

    &:focus {
        outline: none;
    }
`;
