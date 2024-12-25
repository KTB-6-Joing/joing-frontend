import {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import HorizontalScroll from "../components/HorizontalScroll.tsx";
import {useNavigate} from "react-router-dom";
import MessageIcon from "../assets/icons/icon_message.png";
import {recommendItem} from "../services/recommendService.ts";
import {matchingRequestToItem} from "../services/matchingService.ts";
import Loading from "../assets/Loading.gif";


interface Draft {
    id: number;
    title: string;
    content: string;
    keywords: string[];
}

const RecommendDraft = () => {
    const navigate = useNavigate();
    const [recDraft, setRecDraft] = useState<Draft[]>([]);
    const [isRequestSent, setIsRequestSent] = useState<boolean[]>(new Array(recDraft.length).fill(false));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchDraftRecommend = async () => {
        try {
            setIsLoading(true);
            const data: Draft[] = await recommendItem();
            setRecDraft(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDraftRecommend();
    }, []);

    const handleMatchingRequest = async (id: number, index: number) => {
        try {
            const response = await matchingRequestToItem(id);
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
                    Joing이 회원님께 추천하는 기획안을 가져왔어요!
                </Slogan>
                <DraftBox>
                    <HorizontalScroll>
                        {recDraft.map((draft: Draft, index: number) => (
                            <DraftItem key={index}>
                                <Title>{draft.title}</Title>
                                <Summary>{draft.content}</Summary>
                                <Keywords>
                                    {(draft.keywords || []).map((keyword: string, idx: number) => (
                                        <Keyword key={idx}>{keyword}</Keyword>
                                    ))}
                                </Keywords>
                                <MatchingButton
                                    onClick={() => handleMatchingRequest(draft.id, index)}
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
                            </DraftItem>
                        ))}
                    </HorizontalScroll>
                </DraftBox>

                {isLoading && (
                    <Modal>
                        <img src={Loading} alt="loading img"/>
                        <p>Joing이 회원님께 추천할 기획안을 찾고 있어요...</p>
                    </Modal>
                )}

                <Buttons>
                    <ExitButton onClick={() => navigate("/")}>매칭 끝내기</ExitButton>
                </Buttons>
            </Container>
        </Layout>
    )
};

export default RecommendDraft;

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
        font-size: 1.2rem;
    }

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const DraftBox = styled.div`
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
    gap: 3rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        width: 300px;
    }
`;

const Title = styled.h2`
    font-family: 'SUITE-Bold', serif;
    font-size: 1.2rem;
    margin: 30px 0 0 0;

    @media (max-width: 768px) {
        font-size: 1.1rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const Summary = styled.p`
    font-family: 'SUITE-Regular', serif;
    font-size: 1rem;
    margin: 0;
    flex: 1;

    @media (max-width: 768px) {
        font-size: 0.9rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const Keywords = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
`;

const Keyword = styled.span`
    padding: 6px 10px;
    border-radius: 10px;
    background-color: #f3f3f3;
    font-size: 0.8px;
    font-family: 'SUITE-Regular', serif;

    @media (max-width: 768px) {
        font-size: 0.7rem;
    }
`;

const MatchingButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    background-color: ${({disabled}) => (disabled ? "#a0a0a0" : "#000000")};
    border-radius: 8px;
    color: #ffffff;
    transition: background-color 0.3s;
    cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

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
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
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
    font-size: 1rem;
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
