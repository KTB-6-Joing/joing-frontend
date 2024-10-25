import React, {useState} from "react";
import styled from "styled-components";
import NoticeIcon from "../../assets/icons/icon_notice.png";

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
    "게임", "과학기술", "교육", "노하우/스타일", "뉴스/정치", "스포츠", "비영리/사회운동", "애완동물/동물",
    "엔터테인먼트", "여행/이벤트", "영화/애니메이션", "음악", "인물/블로그", "자동차/교통", "코미디", "기타"
];

const Join: React.FC<CreatorJoinProps> = ({ onNext, onBack, role}) => {
    const [nickname, setNickname] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null> (null);
    const [channelLink, setChannelLink] = useState('');
    const [emailPrefix, setEmailPrefix] = useState('');
    const [emailDomain, setEmailDomain] = useState(emailDomains[0]);
    const [customDomain, setCustomDomain] = useState('');
    const [fullEmail, setFullEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifyEnabled, setIsVerifyEnabled] = useState(false);
    const [isCodeInputVisible, setIsCodeInputVisible] = useState(false);
    const [isVerifiedClicked, setIsVerifiedClicked] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const isOkayEnabled =
        role === "creator"
            ? nickname && isEmailVerified && selectedCategory && channelLink && selectedType
            : nickname && isEmailVerified && selectedType;

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

    const handleVerifyClick= () => {
        if (verificationCode === "000000") {
            setIsEmailVerified(true);
        }

        setIsCodeInputVisible(true);
        setIsVerifiedClicked(true);
    }

    const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const handleChannelLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChannelLink(e.target.value);
    };

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isOkayEnabled) {
            console.log({
                nickname,
                fullEmail,
                selectedCategory,
                channelLink,
                selectedType,
            });
            onNext();
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Title>회원가입</Title>
                <InputForm>
                    <Label>Nickname (Channel Name)</Label>
                    <InputField
                        placeholder="Enter your Nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                </InputForm>
                <InputForm>
                    <Label>Email</Label>
                    <EmailContainer>
                        <InputField
                            placeholder="Enter your Email"
                            onChange = {handleEmailPrefixChange}
                            disabled={isEmailVerified}
                        />
                        <EmailSeparator>@</EmailSeparator>
                        {emailDomain === '직접 입력' ? (
                            <InputField
                                type="text"
                                value={customDomain}
                                onChange={handleCustomDomainChange}
                                placeholder="입력하세요."
                                disabled={isEmailVerified}
                            />
                        ) : (
                            <ComboBox
                                value={emailDomain}
                                onChange={handleDomainChange}
                                disabled={isEmailVerified}
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
                    <VerifyContainer>
                        <InputField
                            placeholder="Enter your verification code"
                            value={verificationCode}
                            onChange={handleVerificationCodeChange}
                            disabled={isEmailVerified}
                            style={{ display: isCodeInputVisible ? 'block' : 'none' }}
                        />
                        <VerifyButton
                            onClick={handleVerifyClick}
                            disabled={!isVerifyEnabled || isEmailVerified}
                        >
                            {isVerifiedClicked ? '인증하기' : '이메일 인증'}
                        </VerifyButton>
                    </VerifyContainer>
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
                            <Label>Chennel Link</Label>
                            <InputField
                                placeholder="Enter your Channel URL"
                                value={channelLink}
                                onChange={handleChannelLinkChange}
                            />
                            <Notice>
                                <img src={NoticeIcon} alt="Notice Icon"/>
                                유튜브, 인스타그램, 틱톡 등 프로필 링크를 입력해주세요
                            </Notice>
                        </InputForm>
                        <InputForm>
                            <Label>Media Type</Label>
                            <Types>
                                <Type
                                    onClick={() => handleTypeClick("Short-Form")}
                                    isSelected={selectedType === "Short-Form"}
                                >
                                    Short-Form
                                </Type>
                                <Type
                                    onClick={() => handleTypeClick("Long-Form")}
                                    isSelected={selectedType === "Long-Form"}
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
                                            onClick={() => handleTypeClick(category)}
                                            isSelected={selectedType === category}
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
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

const InputForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 4px;
    margin-top: 0;
    color: #333;
`;

const InputField = styled.input`
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    margin-top: 3px;
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

const VerifyContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
`;

const EmailSeparator = styled.span`
    padding: 0 8px;
    font-size: 14px;
`;

const VerifyButton = styled.button`
    padding: 6px 15px;
    width: 100px;
    height: 30px;
    background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#000000')};
    border: none;
    border-radius: 5px;
    color: white;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s;
    font-size: 12px;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#cccccc' : '#3e3e3e')};
        border: none;
    }
`;

const ComboBox = styled.select`
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
    border: 1px solid ${({ isSelected }) => (isSelected ? '#555' : '#ccc')};
    border-radius: 20px;
    background-color: ${({ isSelected }) => (isSelected ? '#b6b6b6' : '#f9f9f9')};
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    font-size: 12px;

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

const Buttons = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 25px;
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

const Category = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;
