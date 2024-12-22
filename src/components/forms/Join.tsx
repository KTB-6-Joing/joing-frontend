import React, {useEffect, useState} from "react";
import styled, {css, keyframes} from "styled-components";
import NoticeIcon from "../../assets/icons/icon_notice.png";
import {creatorJoin, productmanagerJoin} from "../../services/authService.ts";
import MediaTypeSelector from "../elements/MediaTypeSelector.tsx";
import {MultiCategorySelector} from "../elements/CategorySelector.tsx";
import categories from "../../data/categories";
import {Role} from "../../constants/roles.ts";
import emailDomains from "../../data/emailDomains.ts";
import ChannelIdGuideModal from "../modal/ChannelIdGuideModal.tsx";
import {existNickname, profileEvaluation} from "../../services/userService.ts";
import ResultModal from "../modal/Modal.tsx";
import LoadingGif from "../../assets/Loading.gif";


interface JoinProps {
    onNext: () => void;
    onBack: () => void;
    role: Role | null;
}

const Join: React.FC<JoinProps> = ({onNext, onBack, role}) => {
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
    const [profileImage, setProfileImage] = useState<string>('');
    const [subscribers, setSubscribers] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
    const [isEvalueResultModal, setIsEvalueResultModal] = useState(false);
    const [evalueModalContent, setEvalueModalContent] = useState<React.ReactNode>(null);
    const [isEvaluationLoading, setIsEvaluationLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [debouncedNickname, setDebouncedNickname] = useState(nickname);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const closeResultModal = () => setIsEvalueResultModal(false);

    const isOkayEnabled =
        role === Role.CREATOR
            ? nickname && selectedCategory && channelID && channelLink && selectedType && isVerifyEnabled && !isEditable && profileImage && isAvailable
            : nickname && selectedCategories.length > 0 && isVerifyEnabled && isAvailable;

    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedNickname(nickname);
        }, 3000);

        return () => {
            clearTimeout(handler);
        };
    }, [nickname]);

    useEffect(() => {
        if (debouncedNickname) {
            handleNicknameExist(debouncedNickname);
        }
    }, [debouncedNickname]);

    const handleNicknameExist = async(nickname: string) => {
        try{
            const response = await existNickname(nickname);

            if (response.available) {
                setIsAvailable(true);
            } else{
                setIsAvailable(false);
            }
        }catch (_error) {
            console.log('Error in fetch nickname exists');
        }
    };

    useEffect(() => {
        handleNicknameExist(nickname);
    }, [nickname]);

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

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isOkayEnabled) return;

        try {
            if (role === Role.CREATOR) {
                const result = await creatorJoin({
                    nickname,
                    email: fullEmail,
                    channelId: channelID,
                    channelUrl: channelLink,
                    profileImage: profileImage,
                    subscribers: subscribers,
                    mediaType: selectedType || '',
                    category: selectedCategory || '',
                });

                if (result.success) {
                    onNext();
                } else {
                    alert('Failed to sign up as creator. Please try again.');
                }
            } else if (role === Role.PRODUCT_MANAGER) {
                const result = await productmanagerJoin({
                    nickname,
                    email: fullEmail,
                    favoriteCategories: selectedCategories.length > 0 ? selectedCategories : [],
                });

                if (result.success) {
                    onNext();
                } else {
                    alert('Failed to sign up as productManager. Please try again.');
                }
            } else {
                alert('Invalid role selected. Please select a valid role.');
            }
        } catch (_error) {
            alert('An unexpected error occurred. Please try again.');
        }
    };

    const handleEvaluation = async () => {
        if (!channelID) return;
        setIsEvalueResultModal(true);
        setIsEvaluationLoading(true);

        setEvalueModalContent(
            <Loading>
                <img src={LoadingGif} alt="Loading..."/>
            </Loading>
        );

        try {
            const response = await profileEvaluation(channelID);

            if (response.evaluationStatus) {
                setEvalueModalContent('채널 평가에 성공했습니다.');
                setProfileImage(response.channelImage);
                setSubscribers(response.subscribers);
                setIsEditable(false);
            } else {
                setEvalueModalContent(
                    `채널 평가에 통과하지 못했습니다. 이유는 다음과 같습니다: ${response.message || '다시 시도해주세요.'}`
                );
            }
        } catch (_error) {
            setEvalueModalContent(
                '에러가 발생했습니다. 다시 시도해주세요.'
            );
        }
        setIsEvaluationLoading(false);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Title>회원가입</Title>
                <InputForm>
                    <Label>Nickname</Label>
                    <InputField
                        placeholder="닉네임을 입력해주세요"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    {!isAvailable &&
                        <RedNotice>
                            <img src={NoticeIcon} alt="Notice Icon"/>
                            중복되는 닉네임입니다
                        </RedNotice>
                    }
                    {role === Role.CREATOR &&
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
                            placeholder="이메일을 입력해주세요"
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
                {role === Role.CREATOR && (
                    <>
                        <InputForm>
                            <Label>Channel Category</Label>
                            <ComboBox
                                value={selectedCategory || ''}
                                onChange={handleCategoryChange}
                            >
                                <option value="" disabled selected>Choose your channel Category</option>
                                {Object.values(categories).map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </ComboBox>
                        </InputForm>
                        <InputForm>
                            <Label>Channel ID / Link</Label>
                            <EvaluationForm>
                                <InputField
                                    placeholder="채널 ID를 입력해주세요"
                                    value={channelID}
                                    onChange={handleChannelIDChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                />
                                <TipIcon
                                    src={NoticeIcon}
                                    alt="Notice Icon"
                                    isFocused={isFocused}
                                    onClick={openModal}
                                />
                                <ChannelIdGuideModal isOpen={isModalOpen} onClose={closeModal}/>
                                <EvaluationButton
                                    type="button"
                                    disabled={!channelID || !isEditable}
                                    onClick={handleEvaluation}
                                >
                                    평가
                                </EvaluationButton>
                            </EvaluationForm>
                            <InputField
                                placeholder="채널 URL을 입력해주세요"
                                value={channelLink}
                                onChange={handleChannelLinkChange}
                            />
                            <Notice>
                                <img src={NoticeIcon} alt="Notice Icon"/>
                                유튜브 채널 아이디 및 링크를 입력해주세요
                            </Notice>
                        </InputForm>
                        <InputForm>
                            <Label>Media Type</Label>
                            <MediaTypeSelector selectedType={selectedType} setSelectedType={setSelectedType}
                                               readOnly={false}/>
                        </InputForm>
                        <ResultModal isOpen={isEvalueResultModal} onClose={closeResultModal}>
                            <div>
                                {evalueModalContent}
                            </div>
                            {!isEvaluationLoading && (
                                <ButtonContainer>
                                    <ModalOkayButton onClick={closeResultModal}>확인</ModalOkayButton>
                                </ButtonContainer>
                            )}
                        </ResultModal>
                    </>
                )}
                {role === Role.PRODUCT_MANAGER && (
                    <>
                        <InputForm>
                            <Label>선호 카테고리</Label>
                            <MultiCategorySelector
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                readOnly={false}
                            />
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
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin: 2.5rem;
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

const EmailSeparator = styled.span`
    padding: 0 8px;
    font-size: 14px;
`;

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

const RedNotice = styled(Notice)`
    color: red;
`;

const bounce = keyframes`
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
`;

const TipIcon = styled.img<{ isFocused: boolean }>`
    width: 1.5rem;
    height: auto;
    ${({isFocused}) =>
            isFocused &&
            css`
                animation: ${bounce} 0.6s infinite;
            `}
    transition: animation 0.3s;
`;

const EvaluationForm = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
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

const EvaluationButton = styled.button`
    padding: 6px 12px;
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`;

const ModalOkayButton = styled.button`
    padding: 6px 12px;
    background-color: #000000;
    border: none;
    border-radius: 10px;
    color: white;
    transition: background-color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: #3e3e3e;
        border: none;
    }
`;

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;

    img {
        width: 3rem;
        height: auto;
    }
`;
