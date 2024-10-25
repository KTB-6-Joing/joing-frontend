import React, {useState} from 'react';
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import '../styles/fonts.css';

const categories = [
    "게임", "과학기술", "교육", "노하우/스타일", "뉴스/정치", "스포츠", "비영리/사회운동", "애완동물/동물",
    "엔터테인먼트", "여행/이벤트", "영화/애니메이션", "음악", "인물/블로그", "자동차/교통", "코미디", "기타"
];

const DraftPlan: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const isOkayEnabled = title && content && selectedType && selectedCategory

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
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
            console.log({
                title,
                content,
                selectedCategory,
                selectedType,
            });
        }
    };

    return(
        <Layout>
            <Title>기획안 작성</Title>
            <SubTitle>Fill in the details below to create your plan.</SubTitle>
            <DraftForm onSubmit={handleSubmit}>
                <Container>
                    <LeftBox>
                        <TitleForm>
                            <Label>Title</Label>
                            <TitleInputField
                                placeholder="Enter plan title"
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </TitleForm>
                        <ContentForm>
                            <Label>Content</Label>
                            <ContentInputField
                                placeholder="Enter plan contents"
                                value={content}
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
                    <BackButton type="button">cancel</BackButton>
                    <OkayButton
                        type="submit"
                        disabled={!isOkayEnabled}
                    >
                        요약하기
                    </OkayButton>
                </Buttons>
            </DraftForm>
        </Layout>
    )
}

export default DraftPlan;

const Title = styled.h2`
    font-family: 'Paperlogy-6Bold',serif;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 0;
`;

const SubTitle = styled.p`
    font-family: 'SUITE-Regular',serif;
    font-size: 14px;
    margin-bottom: 30px;
    margin-top: 5px;
`;

const DraftForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    gap: 30px;
    height: 430px;
`;

const LeftBox = styled.div`
    flex: 2;
    height: 100%;
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
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 17px;
    margin-top: 3px;
    transition: border-color 0.3s;
    flex: 1;
    font-family: 'SUITE-Regular',serif;

    &:focus {
        border-color: #666;
        outline: none;
    }
`;

const ContentForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const ContentInputField = styled.textarea`
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 15px;
    margin-top: 3px;
    transition: border-color 0.3s;
    flex-grow: 1;
    resize: none;
    height: 300px;
    font-family: 'SUITE-Regular',serif;

    &:focus {
        border-color: #666;
        outline: none;
    }
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
    margin-top: 25px;
    gap: 10px;
`;

const BackButton = styled.button`
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

const OkayButton = styled.button`
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
