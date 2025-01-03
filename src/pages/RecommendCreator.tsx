import {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import HorizontalScroll from "../components/HorizontalScroll.tsx";
import {useNavigate, useLocation} from "react-router-dom";
import MessageIcon from "../assets/icons/icon_message.png";
import {recommendCreator} from "../services/recommendService.ts";
import {matchingRequestToCreator} from "../services/matchingService.ts";
import Loading from "../assets/Loading.gif";

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
    const id = params.get("itemId") || '';
    const itemId = Number(id);

    const [isRequestSent, setIsRequestSent] = useState<boolean[]>(new Array(drafts.length).fill(false));
    const [recCreator, setRecCreator] = useState<Creator[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCreatorRecommend = async () => {
        try {
            setIsLoading(true);
            const data: Creator[] = await recommendCreator(itemId);
            setRecCreator(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCreatorRecommend();
    }, []);

    const handleMatchingRequest = async (itemId: number, creatorId: number, index: number) => {
        try {
            const response = await matchingRequestToCreator({itemId, creatorId});
            if (!response.success) {
                alert('매칭 요청에 실패했습니다');
                return;
            }
            const updatedRequestSent = [...isRequestSent];
            updatedRequestSent[index] = true;
            setIsRequestSent(updatedRequestSent);
        } catch (_error) {
            alert('매칭 요청에 오류가 발생했습니다');
        }
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
                                        <VisitButton>채널 방문하기</VisitButton>
                                    </a>
                                    <MatchingButton
                                        onClick={() => handleMatchingRequest(itemId, creator.id, index)}
                                        disabled={isRequestSent[index]}
                                    >
                                        {isRequestSent[index] ? (
                                            "매칭 요청이 전송되었습니다"
                                        ) : (
                                            <>
                                                <img src={MessageIcon} alt="message icon"/>
                                                매칭 요청
                                            </>
                                        )}
                                    </MatchingButton>
                                </MatchingButtons>
                            </DraftItem>
                        ))}
                    </HorizontalScroll>
                </CreatorBox>

                {isLoading && (
                    <Modal>
                        <img src={Loading} alt="loading img"/>
                        <p>Joing이 기획안과 잘 맞는 크리에이터를 찾고있어요...</p>
                    </Modal>
                )}


                <Buttons>
                    <ExitButton onClick={() => navigate("/")}>매칭 끝내기</ExitButton>
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
    font-size: 1.5rem;
    font-weight: bolder;
    color: black;

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const CreatorBox = styled.div`
    overflow: hidden;
`;

const DraftItem = styled.div`
    flex-shrink: 0;
    margin: 1rem;
    padding: 1rem;
    border: #e4e4e4 solid 1px;
    border-radius: 8px;
    width: 350px;
    white-space: normal;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (max-width: 768px) {
        width: 300px;
    }

    @media (max-width: 768px) {
        width: 270px;
    }
`;

const Profile = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    margin: 8px 0;
    gap: 16px;

    @media (max-width: 768px) {
        height: 130px;
    }

    @media (max-width: 768px) {
        height: 110px;
    }
`;

const ProfileImg = styled.img`
    width: 120px;
    height: auto;
    border-radius: 50%;
    background-color: gray;

    @media (max-width: 768px) {
        width: 110px;
    }

    @media (max-width: 768px) {
        width: 100px;
    }
`;

const ProfileDetail = styled.div``;

const Name = styled.h3`
    font-family: 'GongGothicMedium', serif;
    font-size: 1.2rem;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const Platform = styled.p`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;

const MatchingButtons = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
    gap: 10px;
`;

const VisitButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
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

    @media (max-width: 768px) {
        font-size: 0.8rem;
        height: 35px;
    }

    @media (max-width: 480px) {
        font-size: 0.7rem;
        height: 30px;
    }
`;

const MatchingButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 1rem;
    height: 40px;
    background-color: ${({disabled}) => (disabled ? "#a0a0a0" : "#000000")};
    border-radius: 10px;
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

    @media (max-width: 768px) {
        font-size: 0.9rem;
        height: 35px;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        height: 30px;
    }
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    padding-bottom: 30px;
    gap: 10px;
`;

const ExitButton = styled.button`
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

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #ffffff;
    color: #000000;
    font-size: 18px;
    font-family: 'SUITE-Bold', serif;
    z-index: 1000;

    p{
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        p{
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        p{
            font-size: 0.8rem;
        }
    }
`;
