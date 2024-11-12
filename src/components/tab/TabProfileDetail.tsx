import React from 'react';
import {useUser} from "../../contexts/UserContext.tsx";
import styled from "styled-components";
import KakaoIcon from "../../assets/icons/icon_kakao.png";
import EmailIcon from "../../assets/icons/icon_email.png";
import PlayIcon from "../../assets/icons/icon_playbutton.png";

const TabProfileDetail: React.FC = () => {
    const {role} = useUser();

    return (
        <ProfileDetail>
            <AccountBox>
                <AccountImg>
                    <img src={KakaoIcon} alt="kakao icon"/>
                </AccountImg>
                <InfoContainer>
                    <Title1>Kakao 계정 연결정보</Title1>
                    <Title2>abc@kakao.com</Title2>
                </InfoContainer>
            </AccountBox>
            <AccountBox>
                <AccountImg>
                    <img src={EmailIcon} alt="email icon"/>
                </AccountImg>
                <InfoContainer>
                    <Title1>abc@naver.com</Title1>
                    <Title2>Email address for planners to contact creators</Title2>
                </InfoContainer>
                <EditButton>Edit</EditButton>
            </AccountBox>
            {role === "creator" &&
                <>
                    <CreatorAccountBoxHeader>
                        <Title>Ellie's Channel</Title>
                        <Detail>Connect your YouTube, Instagram, or TikTok link</Detail>
                    </CreatorAccountBoxHeader>
                    <AccountBox>
                        <AccountImg>
                            <img src={PlayIcon} alt="Play icon"/>
                        </AccountImg>
                        <InfoContainer>
                            <Title1>Youtube</Title1>
                            <Title2>@abcabc123</Title2>
                        </InfoContainer>
                        <EditButton>Edit</EditButton>
                    </AccountBox>
                </>
            }
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
    padding: 0.7rem;
    gap: 1rem;
    background-color: #f8f8f8;
    border-radius: 12px;
`;

const AccountImg = styled.div`
    background-color: #e6e6e6;
    display: flex;
    padding: 1rem;
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
    background-color: #f3f3f3;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #dadada;
        border: none;
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
