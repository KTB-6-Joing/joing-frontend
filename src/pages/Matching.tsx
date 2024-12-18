import {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import link from "../assets/Logo_joing2.png"
import {ItemStatus} from "../constants/itemStatus.ts";
import {Role} from "../constants/roles.ts";
import {deleteMatching, matchingStatus, matchingStatusUpdate} from "../services/matchingService.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../contexts/UserContext.tsx";

interface MatchingInfo {
    status: ItemStatus;
    sender: Role;
    itemId: number;
    productManage: ProductManager;
    summary: Summary;
    creator: Creator;
}

interface ProductManager {
    profileImage: string;
    nickname: string;
    email: string;
}

interface Summary {
    title: string;
    content: string;
    keyword: string[];
}

interface Creator {
    nickname: string;
    profileImage: string;
    email: string;
    channelUrl: string;
}

const Matching = () => {
    const {matchingId} = useParams<{ matchingId: string }>();
    const id = matchingId ? Number(matchingId) : -1;
    const {role} = useUser();
    const navigate = useNavigate();
    const [matchingInfo, setMatchingInfo] = useState<MatchingInfo | null>(null);

    const fetchMatchingInfo = async () => {
        try {
            const response = await matchingStatus(id);
            setMatchingInfo(response.data);
        } catch (error) {
            console.error("Failed to fetch MatchingInfo:", error);
        }
    };

    useEffect(() => {
        fetchMatchingInfo();
    }, []);

    if (!matchingInfo) return <p>Loading...</p>;

    const handleCancel = async (matchingId: number) => {
        try {
            const response = await deleteMatching(matchingId);

            if (!response.success) {
                alert('매칭 요청 취소에 실패했습니다');
                return;
            }
            alert('매칭 요청을 취소했습니다');
            navigate(-1);
        } catch (error) {
            alert('매칭 요청 취소에 오류가 발생했습니다');
        }
    }

    const handleAccept = async (matchingId: number) => {
        try {
            const response = await matchingStatusUpdate(matchingId, ItemStatus.ACCEPTED);

            if (response.status !== 200) {
                alert('매칭 요청 수락에 실패했습니다');
                return;
            }
            alert('매칭을 수락했습니다');
            setMatchingInfo((prev) => ({
                ...prev,
                ...response.data
            }))
        } catch (error) {
            alert('매칭 수락에 오류가 발생했습니다');
        }
    }

    const handleReject = async (matchingId: number) => {
        try {
            const response = await matchingStatusUpdate(matchingId, ItemStatus.REJECTED);

            if (response.status !== 200) {
                alert('매칭 요청 거절에 실패했습니다');
                return;
            }
            alert('매칭을 거절했습니다');
            navigate(-1);
        } catch (error) {
            alert('매칭 거절에 오류가 발생했습니다');
        }
    }

    const handleItemView = (itemId: number) => {
        navigate(`/draftplan/${itemId}`);
    };

    return (
        <Layout>
            <Wrapper>
                <CreatorContainer>
                    <Title>Creator Profile</Title>
                    <Profile>
                        <ProfileImg src={matchingInfo.creator.profileImage}
                                    alt={`${matchingInfo.creator.nickname}'s profile`}/>
                        <ProfileDetail>
                            <Name>{matchingInfo.creator.nickname}</Name>
                            <Platform>Youtuber</Platform>
                        </ProfileDetail>
                    </Profile>
                    <a href={matchingInfo.creator.channelUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <VisitButton>Visit Channel</VisitButton>
                    </a>
                    {(matchingInfo.status === ItemStatus.ACCEPTED) &&
                        <Email>{matchingInfo.creator.email}</Email>
                    }
                </CreatorContainer>

                <Link src={link} alt="link"/>

                <ItemContainer>
                    <Title>Item Summary</Title>
                    <SumTitle>{matchingInfo.summary.title}</SumTitle>
                    <Summary>{matchingInfo.summary.content}</Summary>
                    <Keywords>
                        {(matchingInfo.summary.keyword || []).map((keyword: string, idx: number) => (
                            <Keyword key={idx}>{keyword}</Keyword>
                        ))}
                    </Keywords>
                    {(matchingInfo.status === ItemStatus.ACCEPTED) &&
                        <>
                            <Name>{matchingInfo.productManage.nickname}</Name>
                            <Email>{matchingInfo.productManage.email}</Email>
                        </>
                    }
                </ItemContainer>
            </Wrapper>

            {(matchingInfo.status === ItemStatus.PENDING) &&
                <>
                    {matchingInfo.sender === role ? (
                        <ButtonGroup>
                            <CancelButton onClick={() => handleCancel(id)}>취소</CancelButton>
                            <ItemViewButton onClick={() => handleItemView(matchingInfo.itemId)}>기획안 보기</ItemViewButton>
                        </ButtonGroup>
                    ) : (
                        <ButtonGroup>
                            <RejectButton onClick={() => handleReject(id)}>거절</RejectButton>
                            <AcceptButton onClick={() => handleAccept(id)}>수락</AcceptButton>
                        </ButtonGroup>
                    )}
                </>
            }
            {(matchingInfo.status === ItemStatus.ACCEPTED) &&
                <ItemViewButton onClick={() => handleItemView(matchingInfo.itemId)}>기획안 상세보기</ItemViewButton>
            }
            {(matchingInfo.status === ItemStatus.REJECTED) &&
                <p>거절된 요청입니다</p>
            }
            {(matchingInfo.status === ItemStatus.CANCELED) &&
                <p>취소된 요청입니다</p>
            }

        </Layout>
    )
};

export default Matching;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const CreatorContainer = styled.div`
    flex: 1;
`;

const ItemContainer = styled.div`
    flex: 1;
`;

const Link = styled.img`
    width: 50px;
    height: 50px;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin: 2.5rem;
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

const SumTitle = styled.h2`
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

const Name = styled.h3`
    font-family: 'GongGothicMedium', serif;
`;

const Platform = styled.p`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
`;

const Email = styled.p``;

const ButtonGroup = styled.div``;

const CancelButton = styled.button``;

const ItemViewButton = styled.button``;

const RejectButton = styled.button``;

const AcceptButton = styled.button``;
