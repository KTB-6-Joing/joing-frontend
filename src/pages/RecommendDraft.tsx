import {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import HorizontalScroll from "../components/HorizontalScroll.tsx";
import {useNavigate} from "react-router-dom";
import MessageIcon from "../assets/icons/icon_message.png";
import {recommendItem} from "../services/recService.ts";
import Loading from "../assets/Loading.gif";

interface Draft {
    id: number;
    title: string;
    content: string;
    keywords: string[];
}

const RecommendDraft = () => {
    const drafts = JSON.parse(localStorage.getItem("draftPlans") || "[]");
    const navigate = useNavigate();
    const [isRequestSent, setIsRequestSent] = useState<boolean[]>(new Array(drafts.length).fill(false));
    const [recDraft, setRecDraft] = useState<Draft[]>([]);
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

    const handleMatchingRequest = (index: number) => {
        const updatedRequestSent = [...isRequestSent];
        updatedRequestSent[index] = true;
        setIsRequestSent(updatedRequestSent);
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
    font-size: 24px;
    font-weight: bolder;
    color: black;
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
`;

const Title = styled.h2`
    font-family: 'SUITE-Bold', serif;
    font-size: 1.2rem;
    margin: 30px 0 0 0;
`;

const Summary = styled.p`
    font-family: 'SUITE-Regular', serif;
    font-size: 1rem;
    margin: 0;
    flex: 1;
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
    font-size: 13px;
    font-family: 'SUITE-Regular', serif;
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
`;
