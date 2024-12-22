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
    productManagerNickname: string;
    productManagerEmail: string;
    itemId: number;
    itemTitle: string;
    itemContent: string;
    itemKeyword: string[];
    creatorNickname: string;
    creatorProfileImage: string;
    creatorEmail: string;
    creatorChannelUrl: string;
    status: ItemStatus;
    sender: Role;
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
                        <ProfileImg src={matchingInfo.creatorProfileImage}
                                    alt={`${matchingInfo.creatorNickname}'s profile`}/>
                        <ProfileDetail>
                            <Name>{matchingInfo.creatorNickname}</Name>
                            <Platform>Youtuber</Platform>
                        </ProfileDetail>
                    </Profile>
                    {(matchingInfo.status === ItemStatus.ACCEPTED) &&
                        <Email>contact: {matchingInfo.creatorEmail}</Email>
                    }
                    <a href={matchingInfo.creatorChannelUrl || "#"} target="_blank" rel="noopener noreferrer">
                        <VisitButton>채널 방문하기</VisitButton>
                    </a>

                </CreatorContainer>

                <LinkContainer>
                    <Link src={link} alt="link"/>
                </LinkContainer>

                <ItemContainer>
                    <Title>Item Summary</Title>
                    <SumTitle>{matchingInfo.itemTitle}</SumTitle>
                    <Summary>{matchingInfo.itemContent}</Summary>
                    <Keywords>
                        {(matchingInfo.itemKeyword || []).map((keyword: string, idx: number) => (
                            <Keyword key={idx}>{keyword}</Keyword>
                        ))}
                    </Keywords>
                    {(matchingInfo.status === ItemStatus.ACCEPTED) &&
                        <>
                            <Title>Product Manager Profile</Title>
                            <Name>{matchingInfo.productManagerNickname}</Name>
                            <Email>contacnt: {matchingInfo.productManagerEmail}</Email>
                        </>
                    }
                </ItemContainer>
            </Wrapper>

            <ButtonGroup>
                {matchingInfo.status === ItemStatus.PENDING &&
                    <>
                        {matchingInfo.sender === role ? (
                            <>
                                <CancelButton onClick={() => handleCancel(id)}>취소</CancelButton>
                                {role === Role.PRODUCT_MANAGER && (
                                    <ItemViewButton onClick={() => handleItemView(matchingInfo.itemId)}>
                                        기획안 보기
                                    </ItemViewButton>
                                )}
                            </>
                        ) : (
                            <>
                                <RejectButton onClick={() => handleReject(id)}>거절</RejectButton>
                                <AcceptButton onClick={() => handleAccept(id)}>수락</AcceptButton>
                            </>
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
            </ButtonGroup>

        </Layout>
    )
};

export default Matching;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const CreatorContainer = styled.div`
    flex: 1;
    padding: 3rem 0;
`;

const ItemContainer = styled.div`
    flex: 1;
    padding: 3rem 0;
`;

const LinkContainer = styled.div`
    display: flex;
    height: 100%;
`;

const Link = styled.img`
    width: 70px;
    height: 70px;
    margin: 15rem 5rem;
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
    padding: 12px;
    width: 100%;
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
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;
    }

    &:focus {
        outline: none;
    }
`;

const SumTitle = styled.h2`
    font-family: 'SUITE-Bold', serif;
    font-size: 1.2rem;
`;

const Summary = styled.p`
    font-family: 'SUITE-Regular', serif;
    font-size: 1rem;
    flex: 1;
`;

const Keywords = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 2rem 0;
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

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
`;

const CancelButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    padding: 12px;
    width: 10rem;
    background-color: #ffffff;
    border: black solid 1px;
    border-radius: 10px;
    color: #000000;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
        border: 1px solid #000000;
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;
    }

    &:focus {
        outline: none;
    }
`;

const ItemViewButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    padding: 12px;
    width: 10rem;
    background-color: #000000;
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #3e3e3e;
        border: none;
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;
    }

    &:focus {
        outline: none;
    }
`;

const RejectButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    padding: 12px;
    width: 10rem;
    background-color: #ffffff;
    border: black solid 1px;
    border-radius: 10px;
    color: #000000;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #e0e0e0;
        border: 1px solid #000000;
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;
    }

    &:focus {
        outline: none;
    }
`;

const AcceptButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    padding: 12px;
    width: 10rem;
    background-color: #000000;
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #3e3e3e;
        border: none;
        transform: scale(1.02);
        transition: transform 0.2s ease-in-out;
    }

    &:focus {
        outline: none;
    }
`;
