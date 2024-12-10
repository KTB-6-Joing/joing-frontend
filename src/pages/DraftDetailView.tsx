//import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import {useUser} from '../contexts/UserContext.tsx'
import {Role} from "../constants/roles.ts";
import {DeleteDraftPlan, ViewDraftPlan} from "../services/draftService.ts";
import {useEffect, useState} from "react";

interface EtcItem {
    id: number;
    name: string;
    value: string;
}

interface SummaryItem {
    title: string;
    content: string;
    keywords: string[];
}

interface Draft {
    id: number;
    nickname: string;
    email: string;
    title: string;
    content: string;
    mediaType: string;
    category: string;
    etcList: EtcItem[];
    summary: SummaryItem;
}

const DraftDetailView = () => {
    const {id} = useParams<{ id: string }>();
    const [draft, setDraft] = useState<Draft | null>(null);
    const {role} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDraft = async () => {
            try {
                const response = await ViewDraftPlan(id || "");
                setDraft(response.data);
            } catch (error) {
                console.error("Failed to fetch draft:", error);
            }
        };
        fetchDraft();
    }, [id]);

    const handleDelete = async () => {
        try {
            if (draft) {
                await DeleteDraftPlan(draft.id.toString());
                navigate("/");
            }
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };

    if (!draft) {
        return (
            <Layout>
                <None>기획안이 없습니다.</None>
            </Layout>
        );
    }

    return (
        <Layout>
            <Container>
                <LeftBox>
                    <Title>{draft.title}</Title>
                    <Content dangerouslySetInnerHTML={{__html: draft.content}}/>
                </LeftBox>
                <RightBox>
                    <Profile>
                        <ProfileImg/>
                        <ProfileDetail>
                            <Name>{draft.nickname}</Name>
                            <Email>soyeon_0307@naver.com</Email>
                        </ProfileDetail>
                    </Profile>
                    <SummaryView>
                        <Label>Summary</Label>
                        <Summary>{draft.summary.content || "No summary available"}</Summary>
                    </SummaryView>
                    <KeywordView>
                        <Label>Keywords</Label>
                        {draft.summary.keywords.length > 0 ? (
                            <Keywords>
                                {draft.summary.keywords.map((keyword, idx) => (
                                    <Keyword key={idx}>{keyword}</Keyword>
                                ))}
                            </Keywords>
                        ) : (
                            <p>키워드가 없습니다.</p>
                        )}
                    </KeywordView>
                    <TypeView>
                        <Label>Type</Label>
                        <Type>{draft.mediaType}</Type>
                    </TypeView>
                    <CategoryView>
                        <Label>Category</Label>
                        <Category>{draft.category}</Category>
                    </CategoryView>
                    <MiscView>
                        <Label>Additional Information</Label>
                        {draft.etcList.length > 0 ? (
                            <Miscs>
                                {draft.etcList.map((field, idx) => (
                                    <Misc key={idx}>
                                        {field.name}: {field.value}
                                    </Misc>
                                ))}
                            </Miscs>
                        ) : (
                            <p>추가 정보가 없습니다.</p>
                        )}
                    </MiscView>
                </RightBox>
            </Container>
            {role === Role.PRODUCT_MANAGER && (
                <Buttons>
                    <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
                </Buttons>
            )}
        </Layout>
    );
};

export default DraftDetailView;

const None = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Container = styled.section`
    display: flex;
    gap: 50px;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 20px;
`;

const LeftBox = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;

    height: 100%;
`;

const Title = styled.h2`
    font-family: 'SUITE-Bold';
    font-size: 1.5rem;
    margin: 30px 0;
`;

const Content = styled.article``;

const Label = styled.label`
    font-family: 'SUITE-Bold', serif;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
    margin-top: 0;
    color: #333;
`;

const RightBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const View = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Profile = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    margin: 8px 0;
    gap: 16px;
`;

const ProfileImg = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: gray;
`;

const ProfileDetail = styled.div``;

const Name = styled.h3`
    font-family: 'GongGothicMedium', serif;
`;

const Email = styled.p`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
`;

const SummaryView = styled(View)``;

const Summary = styled.p`
    font-family: 'SUITE-Regular', serif;
    font-size: 1rem;
    margin: 0;
`;

const KeywordView = styled(View)``;

const Keywords = styled.div`
    display: flex;
    gap: 8px;
`;

const Span = styled.span`
    padding: 6px 10px;
    border-radius: 10px;
    background-color: #f3f3f3;
    font-size: 13px;
    font-family: 'SUITE-Regular', serif;
`;

const Keyword = styled(Span)``;

const TypeView = styled(View)``;

const Type = styled(Span)``;

const CategoryView = styled(View)``;

const Category = styled(Span)``;

const MiscView = styled(View)``;

const Miscs = styled.div``;

const Misc = styled.li`
    font-family: 'SUITE-Regular', serif;
    font-size: 1rem;
    margin: 0;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px 0;
    padding-bottom: 30px;
    gap: 10px;
`;

const DeleteButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    padding: 6px 15px;
    width: 200px;
    height: 40px;
    background-color: #ff5d5d;
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #FF3D3D;
        border: none;
    }

    &:focus {
        outline: none;
    }
`;
