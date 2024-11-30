import React, {useState} from "react";
import styled from "styled-components";
import NoticeIcon from "../../assets/icons/icon_notice.png";
import {creatorJoin, plannerJoin} from "../../services/authService.ts";

interface CreatorJoinProps {
    onNext: () => void;
    onBack: () => void;
    role: "creator" | "planner" | null;
}

const emailDomains = [
    'naver.com',
    'hanmail.net',
    'daum.net',
    'gmail.com',
    'nate.com',
    '직접 입력'
];

const categories = [
    "GAME",
    "TECH",
    "EDUCATION",
    "KNOWHOW_STYLE",
    "NEWS_POLITICS",
    "SPORTS",
    "NONPROFIT_SOCIAL",
    "PETS_ANIMALS",
    "ENTERTAINMENT",
    "TRAVEL_EVENTS",
    "MOVIE_ANIMATION",
    "MUSIC",
    "PEOPLE_BLOG",
    "AUTO_TRANSPORT",
    "COMEDY",
    "ETC"
];

const Join: React.FC<CreatorJoinProps> = ({onNext, onBack, role}) => {
    const [nickname, setNickname] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [channelID, setChannelID] = useState('');
    const [channelLink, setChannelLink] = useState('');
    const [emailPrefix, setEmailPrefix] = useState('');
    const [emailDomain, setEmailDomain] = useState(emailDomains[0]);
    const [customDomain, setCustomDomain] = useState('');
    const [fullEmail, setFullEmail] = useState('');
    const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const isOkayEnabled =
        role === "creator"
            ? nickname && selectedCategory && channelID && channelLink && selectedType && isVerifyEnabled
            : nickname && selectedType && isVerifyEnabled;

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDomain = e.target.value;
        if (selectedDomain !== '직접 입력') {
            setCustomDomain('');
        }
        setEmailDomain(selectedDomain);
        updateFullEmail(emailPrefix, selectedDomain === '직접 입력' ? customDomain : selectedDomain);
    };

    const handleEmailPrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const prefix = e.target.value;
        setEmailPrefix(prefix);
        updateFullEmail(prefix, emailDomain === '직접 입력' ? customDomain : emailDomain);
    };

    const handleCustomDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const domain = e.target.value;
        setCustomDomain(domain);
        updateFullEmail(emailPrefix, domain);
    };

    const updateFullEmail = (prefix: string, domain: string) => {
        const combinedEmail = `${prefix}@${domain}`;
        setFullEmail(combinedEmail);

        const pattern = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
        if (pattern.test(combinedEmail)) {
            setIsVerifyEnabled(true);
        } else {
            setIsVerifyEnabled(false);
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleChannelIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannelID(e.target.value);
    }

    const handleChannelLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannelLink(e.target.value);
    };

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    }

    const handleCategoryClick = (category: string) => {
        setSelectedCategories((prevSelected) => {
            if (prevSelected.includes(category)) {
                return prevSelected.filter((type) => type !== category);
            } else {
                return [...prevSelected, category];
            }
        });
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isOkayEnabled) return;

        try {
            if (role === 'creator') {
                const result = await creatorJoin({
                    nickname,
                    email: fullEmail,
                    channelId: channelID,
                    channelUrl: channelLink,
                    mediaType: selectedType || '',
                    category: selectedCategory || '',
                });

                if (result.success) {
                    console.log('Creator signup successful');
                    onNext();
                } else {
                    console.error('Creator signup failed:', result.error);
                    alert('Failed to sign up as creator. Please try again.');
                }
            } else if (role === 'planner') {
                const result = await plannerJoin({
                    nickname,
                    email: fullEmail,
                    favoriteCategories: selectedCategories.length > 0 ? selectedCategories : [],
                });

                if (result.success) {
                    console.log('Planner signup successful');
                    onNext();
                } else {
                    console.error('Planner signup failed:', result.error);
                    alert('Failed to sign up as planner. Please try again.');
                }
            } else {
                console.error('Invalid role:', role);
                alert('Invalid role selected. Please select a valid role.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Title>회원가입</Title>
                <InputForm>
                    <Label>Nickname</Label>
                    <InputField
                        placeholder="Enter your Nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    {role === "creator" &&
                        <Notice>
                            <img src={NoticeIcon} alt="Notice Icon"/>
                            채널 이름과 동일하게 설정하시는걸 추천드려요
                        </Notice>
                    }

                </InputForm>
                <InputForm>
                    <Label>Email</Label>
                    <EmailContainer>
                        <InputField
                            placeholder="Enter your Email"
                            onChange={handleEmailPrefixChange}
                        />
                        <EmailSeparator>@</EmailSeparator>
                        {emailDomain === '직접 입력' ? (
                            <InputField
                                type="text"
                                value={customDomain}
                                onChange={handleCustomDomainChange}
                                placeholder="입력하세요."
                            />
                        ) : (
                            <ComboBox
                                value={emailDomain}
                                onChange={handleDomainChange}
                            >
                                {emailDomains.map((domain) => (
                                    <option key={domain} value={domain}>
                                        {domain}
                                    </option>
                                ))}
                            </ComboBox>
                        )}
                    </EmailContainer>
                    <Notice>
                        <img src={NoticeIcon} alt="Notice Icon"/>
                        상대와 연락할 때 사용할 이메일을 입력해주세요
                    </Notice>
                </InputForm>
                {role === "creator" && (
                    <>
                        <InputForm>
                            <Label>Channel Category</Label>
                            <ComboBox
                                value={selectedCategory || ''}
                                onChange={handleCategoryChange}
                            >
                                <option value="" disabled selected>Choose your channel Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </ComboBox>
                        </InputForm>
                        <InputForm>
                            <Label>Chennel ID / Link</Label>
                            <InputField
                                placeholder="Enter your Channel ID"
                                value={channelID}
                                onChange={handleChannelIDChange}
                            />
                            <InputField
                                placeholder="Enter your Channel URL"
                                value={channelLink}
                                onChange={handleChannelLinkChange}
                            />
                            <Notice>
                                <img src={NoticeIcon} alt="Notice Icon"/>
                                유튜브, 인스타그램, 틱톡 등 프로필 아이디 및 링크를 입력해주세요
                            </Notice>
                        </InputForm>
                        <InputForm>
                            <Label>Media Type</Label>
                            <Types>
                                <Type
                                    onClick={(e) => {
                                        handleTypeClick("SHORT_FORM");
                                        handleButtonClick(e);
                                    }}
                                    isSelected={selectedType === "SHORT_FORM"}
                                >
                                    Short-Form
                                </Type>
                                <Type
                                    onClick={(e) => {
                                        handleTypeClick("LONG_FORM");
                                        handleButtonClick(e);
                                    }}
                                    isSelected={selectedType === "LONG_FORM"}
                                >
                                    Long-Form
                                </Type>
                            </Types>
                        </InputForm>
                    </>
                )}
                {role === "planner" && (
                    <>
                        <InputForm>
                            <Label>선호 카테고리</Label>
                            <Category>
                                {categories.map((category) => (
                                    <Type
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        isSelected={selectedCategories.includes(category)}
                                    >
                                        {category}
                                    </Type>
                                ))}
                            </Category>
                        </InputForm>
                    </>
                )}

                <Buttons>
                    <BackButton type="button" onClick={onBack}>뒤로가기</BackButton>
                    <OkayButton
                        type="submit"
                        disabled={!isOkayEnabled}
                    >
                        확인
                    </OkayButton>
                </Buttons>
            </Form>
        </>
    );
}

export default Join;

const Form = styled.form`
    width: 100%;
`;

const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 4rem;
`;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 4px;
    margin-top: 0;
    color: #333;
`;

const InputField = styled.input`
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 0.3rem;
    transition: border-color 0.3s;
    flex: 1;

    &:focus {
        border-color: #666;
        outline: none;
    }
`;

const EmailContainer = styled.div`
    display: flex;
    align-items: center;
`;

// const VerifyContainer = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     margin-top: 5px;
// `;

const EmailSeparator = styled.span`
    padding: 0 8px;
    font-size: 14px;
`;

// const VerifyButton = styled.button`
//     padding: 6px 15px;
//     width: 100px;
//     height: 30px;
//     background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#000000')};
//     border: none;
//     border-radius: 5px;
//     color: white;
//     cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
//     transition: background-color 0.3s;
//     font-size: 12px;
//
//     &:hover {
//         background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#3e3e3e')};
//         border: none;
//     }
// `;

const ComboBox = styled.select`
    flex: 1;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 3px;
    transition: border-color 0.3s;

    &:focus {
        border-color: #666;
        outline: none;
    }
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #777;
    margin-top: 5px;

    img {
        width: 14px;
        height: 14px;
        margin-right: 4px;
    }
`;

const Types = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`;

const Type = styled.button<{ isSelected: boolean }>`
    padding: 6px 10px;
    border: 1px solid ${({isSelected}) => (isSelected ? '#555' : '#ccc')};
    border-radius: 20px;
    background-color: ${({isSelected}) => (isSelected ? '#b6b6b6' : '#f9f9f9')};
    cursor: pointer;
    transition: background-color 0.1s, border-color 0.3s;
    font-size: 0.8rem;

    &:hover {
        background-color: #bdbdbd;
        border-color: #888;
    }

    &:focus {
        border-color: #555;
        outline: none;
    }

`;

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    gap: 10px;
`;

const BackButton = styled.button`
    padding: 6px 15px;
    width: 100px;
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
    padding: 6px 15px;
    width: 100px;
    height: 40px;
    background-color: ${({disabled}) => (disabled ? '#cccccc' : '#000000')};
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background-color: ${({disabled}) => (disabled ? '#cccccc' : '#3e3e3e')};
        border: none;
    }
`;

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.3rem;
`;
