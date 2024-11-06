import {useState} from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import {useNavigate} from "react-router-dom";

// interface Draft {
//     title: string;
//     summary: string;
//     keywords: string[];
// }

const Message = () => {
    const drafts = JSON.parse(localStorage.getItem("draftPlans") || "[]");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const navigate = useNavigate();

    const handleContactClick = (index: number) => {
        setSelectedIndex(index);
    };

    const handleAcceptClick = () => {
        navigate(`/draftplan/${selectedIndex}`);
    };

    const handleDeleteClick = () => {
        setSelectedIndex(selectedIndex + 1);
    }

    return (
        <Layout>
            <Container>
                <MessageList>
                    <Title>Contact</Title>
                    <ContactList>
                    {drafts.map((_: null, index: number) => (
                        <Contact
                            key={index}
                            onClick={() => handleContactClick(index)}
                            isSelected={selectedIndex === index}
                        >
                            <ProfileImg/>
                            <ProfileDetail>
                                <Name>{`Contact ${index + 1}`}</Name>
                                <ContactTitle>Title{index + 1}</ContactTitle>
                            </ProfileDetail>
                            <ContactTime>5m</ContactTime>
                        </Contact>
                    ))}
                    </ContactList>
                </MessageList>
                <DetailBox>
                    {drafts[selectedIndex] ? (
                        <DraftItem key={selectedIndex}>
                            <Title>{drafts[selectedIndex].title}</Title>
                            <Label>Summary</Label>
                            <Summary>{drafts[selectedIndex].summary}</Summary>
                            <Label>Keywords</Label>
                            <Keywords>
                                {drafts[selectedIndex].keywords.map((keyword: string, idx: number) => (
                                    <Keyword key={idx}>{keyword}</Keyword>
                                ))}
                            </Keywords>
                            <Buttons>
                                <DeleteButton onClick={handleDeleteClick}>매칭 삭제하기</DeleteButton>
                                <AcceptButton onClick={handleAcceptClick}>매칭 수락하고 기획안 자세히 보기</AcceptButton>
                            </Buttons>
                        </DraftItem>
                    ) : (<></>)}
                </DetailBox>
            </Container>
        </Layout>
    )
};

export default Message;

const Container = styled.section`
    display: flex;
    gap: 50px;
    overflow-y: hidden;
    overflow-x: hidden;
    margin: 20px;
    height: 95%;
`;

const MessageList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ContactList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    gap: 0.2rem;
    flex: 1;
    padding-right: 1rem;
`;

const Contact = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    background-color: ${({ isSelected }) => (isSelected ? '#f1f1f1' : 'transparent')};

    &:hover {
        background-color: #f1f1f1;
    }
`;

const ProfileImg = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: gray;
`;

const ProfileDetail = styled.div``;

const Name = styled.text`
    font-family: 'GongGothicMedium', serif;
    font-size: 1rem;
`;

const ContactTitle = styled.div`
    font-size: 0.9rem;
    color: #666;
`;

const ContactTime = styled.div`
    font-size: 0.8rem;
    color: #999;
    margin-left: auto;
`;

const DetailBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 2;
`;

const DraftItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: center;
    gap: 2rem;
    padding: 3rem;
`;

const Title = styled.h2`
    font-family: 'Paperlogy-6Bold', serif;
    font-size: 1.2rem;
    margin: 30px 0 0 0;
`;

const Label = styled.label`
    font-family: 'SUITE-Bold',serif;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
    margin-top: 0;
    color: #333;
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

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding-bottom: 30px;
    width: 100%;
    gap: 10px;
`;

const DeleteButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
    padding: 6px 15px;
    height: 2.5rem;
    background-color: #ffffff;
    border: 1px solid black;
    border-radius: 10px;
    color: black;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
        border: 1px solid #000000;
    }

    &:focus {
        outline: none;
    }
`;

const AcceptButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
    padding: 6px 15px;
    height: 2.5rem;
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
