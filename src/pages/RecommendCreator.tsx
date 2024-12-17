import {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import HorizontalScroll from "../components/HorizontalScroll.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import MessageIcon from "../assets/icons/icon_message.png";
import {recommendCreator} from "../services/recService.ts";

interface Creator {
    id: number;
    profileImage: string;
    nickname: string;
    channelUrl: string;
}

const RecommendCreator = () => {
    const drafts = JSON.parse(localStorage.getItem("draftPlans") || "[]");
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const itemId = params.get("id") || '';
    const [isRequestSent, setIsRequestSent] = useState<boolean[]>(new Array(drafts.length).fill(false));
    const [recCreator, setRecCreator] = useState<Creator[]>([]);

    const fetchCreatorRecommend = async () => {
        try {
            const data: Creator[] = await recommendCreator(itemId);
            setRecCreator(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    useEffect(() => {
        fetchCreatorRecommend();
    }, []);

    const handleMatchingRequest = (index: number) => {
        const updatedRequestSent = [...isRequestSent];
        updatedRequestSent[index] = true;
        setIsRequestSent(updatedRequestSent);
    };

    return (
        <Layout>
            <Container>
                <Slogan>
                    크리에이터에게 매칭을 제안해보세요
                </Slogan>
                <CreatorBox>
                    <HorizontalScroll>
                        {recCreator.map((creator: Creator, index: number) => (
                            <DraftItem key={index}>
                                <Profile>
                                    <ProfileImg src={creator.profileImage} alt={`${creator.nickname}'s profile`}/>
                                    <ProfileDetail>
                                        <Name>{creator.nickname}</Name>
                                        <Platform>Youtuber</Platform>
                                    </ProfileDetail>
                                </Profile>
                                <MatchingButtons>
                                    <a href={creator.channelUrl || "#"} target="_blank" rel="noopener noreferrer">
                                        <VisitButton>Visit Channel</VisitButton>
                                    </a>
                                    <MatchingButton
                                        onClick={() => handleMatchingRequest(index)}
                                        disabled={isRequestSent[index]}
                                    >
                                        {isRequestSent[index] ? (
                                            "매칭 요청이 전송되었습니다"
                                        ) : (
                                            <>
                                                <img src={MessageIcon} alt="message icon"/>
                                                Matching Request
                                            </>
                                        )}
                                    </MatchingButton>
                                </MatchingButtons>
                            </DraftItem>
                        ))}
                    </HorizontalScroll>
                </CreatorBox>

                <Buttons>
                    <DeleteButton onClick={() => navigate("/")}>매칭 끝내기</DeleteButton>
                </Buttons>
            </Container>
        </Layout>
    )
};

export default RecommendCreator;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-grow: 1;
    margin-top: 20px;
`;

const Slogan = styled.h2`
    font-family: 'Paperlogy-6Bold', serif;
    font-size: 24px;
    font-weight: bolder;
    color: black;
`;

const CreatorBox = styled.div`
    overflow: hidden;
`;

const DraftItem = styled.div`
    flex-shrink: 0;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 350px;
    white-space: normal;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Profile = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    margin: 8px 0;
    gap: 16px;
`;

const ProfileImg = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: gray;
`;

const ProfileDetail = styled.div``;

const Name = styled.h3`
    font-family: 'GongGothicMedium', serif;
`;

const Platform = styled.p`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
`;

const MatchingButtons = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
    gap: 10px;
`;

const VisitButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.8rem;
    padding: 6px 15px;
    height: 40px;
    background-color: #ffffff;
    border: 1px solid black;
    border-radius: 10px;
    color: black;
    transition: background-color 0.3s;
    cursor: pointer;
    flex: 1;

    &:hover {
        background-color: #e0e0e0;
        border: 1px solid #000000;
    }

    &:focus {
        outline: none;
    }
`;

const MatchingButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
    background-color: ${({disabled}) => (disabled ? "#a0a0a0" : "#000000")};
    border-radius: 8px;
    color: #ffffff;
    transition: background-color 0.3s;
    cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex: 2;

    &:hover {
        background-color: ${({disabled}) => (disabled ? "#a0a0a0" : "#424242")};
        border: none;
        transform: none;
    }

    &:focus {
        outline: none;
    }

    img {
        width: 16px;
        height: auto;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    padding-bottom: 30px;
    gap: 10px;
`;

const DeleteButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    padding: 6px 15px;
    width: 200px;
    height: 40px;
    background-color: #000000;
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #393939;
        border: none;
    }

    &:focus {
        outline: none;
    }
`;
