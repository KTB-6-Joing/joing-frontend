import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import '../styles/fonts.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import ArrowDown from '../assets/icons/icon_arrowdown.png';

const categories = [
    "게임", "과학기술", "교육", "노하우/스타일", "뉴스/정치", "비영리/사회운동", "스포츠", "애완동물/동물",
    "엔터테인먼트", "여행/이벤트", "영화/애니메이션", "음악", "인물/블로그", "자동차/교통", "코미디", "기타"
];

const DraftPlan: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [readOnly, setReadOnly] = useState(false);
    const [isSummaryClicked, setIsSummaryClicked] = useState(false);
    const [isSummarizing, setIsSummaraizing] = useState(false);

    const isOkayEnabled = title && content && selectedType && selectedCategory
    const quillRef = useRef<ReactQuill | null>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (content: string) => {
        setContent(content);
    }

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    };

    const handleCategoryClick = (type: string) => {
        setSelectedCategory(type);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isOkayEnabled) {
            setIsSummaraizing(true);
            setTimeout(() => {
                setIsSummaraizing(false);
                setIsSummaryClicked(true);
            }, 2000);
        }
        setReadOnly(true);
    };

    useEffect(() => {
        if (isSummaryClicked) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    }, [isSummaryClicked]);

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
        ],
    };

    return(
        <Layout>
            <DraftForm onSubmit={handleSubmit}>
                <Title>기획안 작성</Title>
                <SubTitle>Fill in the details below to create your plan.</SubTitle>
                <Container>
                    <LeftBox>
                        <TitleForm>
                            <Label>Title</Label>
                            <TitleInputField
                                placeholder="Enter plan title"
                                value={title}
                                readOnly={readOnly}
                                onChange={handleTitleChange}
                            />
                        </TitleForm>
                        <ContentForm>
                            <Label>Content</Label>
                            <ReactQuillWrapper
                                ref={quillRef}
                                modules={modules}
                                value={content}
                                placeholder="Enter plan contents"
                                theme="snow"
                                readOnly={readOnly}
                                onChange={handleContentChange}
                            />
                        </ContentForm>
                    </LeftBox>
                    <RightBox>
                        <CategoryForm>
                            <Label>카테고리</Label>
                            <Category>
                                {categories.map((category) => (
                                    <Type
                                        key={category}
                                        onClick={(e) => {
                                            handleCategoryClick(category);
                                            handleButtonClick(e);
                                        }}
                                        isSelected={selectedCategory === category}
                                    >
                                        {category}
                                    </Type>
                                ))}
                            </Category>
                        </CategoryForm>
                        <TypeForm>
                            <Label>Media Type</Label>
                            <Types>
                                <Type
                                    onClick={(e) => {
                                        handleTypeClick("Short-Form");
                                        handleButtonClick(e);
                                    }}
                                    isSelected={selectedType === "Short-Form"}
                                >
                                    Short-Form
                                </Type>
                                <Type
                                    onClick={(e) => {
                                        handleTypeClick("Long-Form");
                                        handleButtonClick(e);
                                    }}
                                    isSelected={selectedType === "Long-Form"}
                                >
                                    Long-Form
                                </Type>
                            </Types>
                        </TypeForm>
                    </RightBox>
                </Container>
                <Buttons>
                    <CancelButton type="button">cancel</CancelButton>
                    <SummarizeButton
                        type="submit"
                        disabled={!isOkayEnabled}
                    >
                        요약하기
                    </SummarizeButton>
                </Buttons>
            </DraftForm>
            {isSummarizing && (
                <Modal>
                    <p>Joing이 요약하는 중이예요...</p>
                </Modal>
            )}
            {isSummaryClicked && (
                <>
                    <SummaryPage>
                        <img src={ArrowDown} alt="arrow down"/>
                        <Summary>
                            <SumTitle>{title}</SumTitle>
                            <SumSubTitle>Summary</SumSubTitle>
                            <SumContent>{content}</SumContent>
                            <SumSubTitle>Keywords</SumSubTitle>
                            <SumKeywords>
                                <Keyword>{selectedType}</Keyword>
                                <Keyword>{selectedCategory}</Keyword>
                            </SumKeywords>
                        </Summary>
                        <Buttons>
                            <ReSumButton type="button">요약 재생성</ReSumButton>
                            <MatchingButton>크리에이터 매칭하기</MatchingButton>
                        </Buttons>
                    </SummaryPage>
                </>
            )}
        </Layout>
    )
}

export default DraftPlan;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 18px;
    font-family: 'SUITE-Bold', serif;
    z-index: 1000;
`;

const Title = styled.h2`
    font-family: 'Paperlogy-6Bold',serif;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 0;
`;

const SubTitle = styled.p`
    font-family: 'SUITE-Regular',serif;
    font-size: 14px;
    margin: 5px 0 30px 0;
`;

const DraftForm = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
`;

const Container = styled.div`
    display: flex;
    gap: 30px;
    flex-grow: 1;
    height: calc(100vh - 200px);
    overflow: hidden;
`;

const LeftBox = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    padding-right: 10px;
`;

const RightBox = styled.div`
    flex: 1;
`;

const Label = styled.label`
    font-family: 'SUITE-Bold',serif;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
    margin-top: 0;
    color: #333;
`;

const TitleForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
`;

const TitleInputField = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 17px;
    margin-top: 3px;
    transition: border-color 0.3s;
    font-family: 'SUITE-Regular',serif;

    &:focus {
        border-color: #666;
        outline: none;
    }
`;

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const CategoryForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
`;

const Types = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const Type = styled.button<{ isSelected: boolean }>`
    padding: 6px 10px;
    border: 1px solid ${({ isSelected }) => (isSelected ? '#555' : '#ccc')};
    border-radius: 20px;
    background-color: ${({ isSelected }) => (isSelected ? '#b6b6b6' : '#f9f9f9')};
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    font-size: 13px;
    font-family: 'SUITE-Regular',serif;

    &:hover {
        background-color: #ececec;
        border-color: #888;
    }

    &:focus {
        background-color: #b6b6b6;
        border-color: #555;
        outline: none;
    }
`;

const TypeForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin: 25px 0;
    gap: 10px;
`;

const CancelButton = styled.button`
    font-family: 'SUITE-Bold',serif;
    padding: 6px 15px;
    width: 150px;
    height: 40px;
    background-color: white;
    border: 1px solid #000000;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0;
        border: 1px solid #000000;
    }
`;

const SummarizeButton = styled.button`
    font-family: 'SUITE-Bold',serif;
    padding: 6px 15px;
    width: 150px;
    height: 40px;
    background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#000000')};
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#3e3e3e')};
        border: none;
    }
`;

const ReactQuillWrapper = styled(ReactQuill)`
    flex: 1;
    height: calc(100% - 100px);

    .ql-container {
        height: 100%;
        min-height: 280px;
    }
`;

const SummaryPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;

    img {
        width: 64px;
        height: auto;
        margin-top: 50px;
    }
`;

const Summary = styled.div`
    margin: 100px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(100% - 200px);
`;

const SumTitle = styled.h2`
    align-self: flex-start;
    font-family: 'GongGothicMedium', serif;
    font-size: 24px;
    font-weight: bold;
`;

const SumSubTitle = styled.h3`
    align-self: flex-start;
    font-family: 'SUITE-Bold', serif;
    font-size: 18px;
    color: #2c2c2c;
`;

const SumContent = styled.p`
    font-family: 'SUITE-Regular',serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
`;

const SumKeywords = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const Keyword = styled.span`
    padding: 6px 10px;
    border-radius: 10px;
    background-color: #f3f3f3;
    font-size: 13px;
    font-family: 'SUITE-Regular', serif;
`;

const ReSumButton = styled.button`
    font-family: 'SUITE-Bold',serif;
    padding: 6px 15px;
    width: 200px;
    height: 40px;
    background-color: white;
    border: 1px solid #000000;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e0e0e0;
        border: 1px solid #000000;
    }
`;

const MatchingButton = styled.button`
    font-family: 'SUITE-Bold',serif;
    padding: 6px 15px;
    width: 200px;
    height: 40px;
    background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#000000')};
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#3e3e3e')};
        border: none;
    }
`;
