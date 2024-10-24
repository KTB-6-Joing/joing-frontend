import React, {useState} from 'react';
import styled from "styled-components";
import Toggle from "../../components/toggle/Toggle.tsx";
import Layout from "../../components/layout/Layout.tsx";
import iconArrow from '../../assets/icons/icon_arrow.png';
// @ts-ignore
import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from '@ap.cx/react-fullpage';

const Onboarding: React.FC = () => {
    const [toggleValue, setIsToggled] = useState("creator");

    const handleToggleChange = (newValue: string) => {
        setIsToggled(newValue);
    };

    return (
        <Layout>
            <Fullpage>
                <FullpageNavigation/>
                <FullPageSections>
                    <CenteredSection>
                        <Container1>
                            <LeftBox>
                                <Toggle value={toggleValue} onToggle={handleToggleChange} />
                                <Slogan>
                                    {toggleValue==="creator" ? "나는 크리에이터다!!" : "나는 기획자다!!"}
                                </Slogan>
                                <Detail>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/>
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco<br/>
                                    laboris nisi ut aliquip ex ea commodo consequat.
                                </Detail>
                                <MainButton value={toggleValue}>
                                    {toggleValue === "creator" ? (
                                        <>
                                            <span>기획안 추천받기</span>
                                            <img src={iconArrow} alt="arrow icon" />
                                        </>
                                    ) : (
                                        <>
                                            <span>기획안 작성하기</span>
                                            <img src={iconArrow} alt="arrow icon" />
                                        </>
                                    )}
                                </MainButton>
                            </LeftBox>

                            <ImgBox>

                            </ImgBox>
                        </Container1>
                    </CenteredSection>
                    <CenteredSection>
                        <Container2>
                            {toggleValue === "creator" ? (
                                <>
                                    <Slogan>
                                        크리에이터인 당신을 위한 JOING만의 차별화된 서비스!
                                    </Slogan>
                                    <Process>
                                        <Box>
                                            <Num>1</Num>
                                            <Title value={toggleValue}>회원가입 및 로그인</Title>
                                            <span>회원가입 시<br/> ‘크리에이터'로 가입</span>
                                        </Box>
                                        <Box>
                                            <Num>2</Num>
                                            <Title value={toggleValue}>포트폴리오 등록</Title>
                                            <span>개인 영상 플랫폼<br/>포트폴리오 등록</span>
                                        </Box>
                                        <Box>
                                            <Num>3</Num>
                                            <Title value={toggleValue}>기획 제안/추천받기</Title>
                                            <span>기획자의 제안 수신<br/> 혹은<br/> 채널 성격에 맞는<br/> 기획안 추천</span>
                                        </Box>
                                        <Box>
                                            <Num>4</Num>
                                            <Title value={toggleValue}>매칭 수락/매칭 제안</Title>
                                            <span>매칭 제안 중<br/> 희망하는 기획안<br/> 매칭 수락<br/> 혹은 관심 기획안에<br/> 매칭 제안</span>
                                        </Box>
                                        <Box>
                                            <Num>5</Num>
                                            <Title value={toggleValue}>CONTACT</Title>
                                            <span>기획자와 협의 진행 후 컨텐츠 제작 및 업로드</span>
                                        </Box>
                                    </Process>
                                </>
                            ) : (
                                <>
                                    <Slogan>
                                        기획자인 당신을 위한 JOING만의 차별화된 서비스!
                                    </Slogan>
                                    <Process>
                                        <Box>
                                            <Num>1</Num>
                                            <Title value={toggleValue}>회원가입 및 로그인</Title>
                                            <span>회원가입 시<br/> ‘기획자'로 가입</span>
                                        </Box>
                                        <Box>
                                            <Num>2</Num>
                                            <Title value={toggleValue}>기획 제안하기</Title>
                                            <span>제목, 카테고리,<br/> 영상 유형(숏폼, 롱폼),<br/> 설명, 필요한 출연자 등<br/> 상세정보를 포함한<br/> 기획안 작성</span>
                                        </Box>
                                        <Box>
                                            <Num>3</Num>
                                            <Title value={toggleValue}>크리에이터 추천</Title>
                                            <span>작성된 기획서 기반<br/> 크리에이터 추천<br/> 기획안 매칭 수락 시,<br/> 다른 크리에이터의<br/> 선 제안 수신 가능</span>
                                        </Box>
                                        <Box>
                                            <Num>4</Num>
                                            <Title value={toggleValue}>매칭 제안/매칭 수락</Title>
                                            <span>추천 크리에이터 중<br/> 희망 크리에이터에게<br/> 매칭 제안 혹은<br/> 크리에이터의<br/> 매칭 제안 수락</span>
                                        </Box>
                                        <Box>
                                            <Num>5</Num>
                                            <Title value={toggleValue}>CONTACT</Title>
                                            <span>매칭을 수락한<br/> 크리에이터와 협의 후<br/> 컨텐츠 제작 및 업로드</span>
                                        </Box>
                                    </Process>
                                </>
                            )}
                        </Container2>
                    </CenteredSection>
                </FullPageSections>
            </Fullpage>
        </Layout>
    )
}

export default Onboarding;

const CenteredSection = styled(FullpageSection)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container1 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
`;

const LeftBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Slogan = styled.h2`
    font-size: 24px;
    font-weight: bolder;
`;

const Detail = styled.text`
    margin-bottom: 50px;
`;

const MainButton = styled.button`
    width: 200px;
    color: white;
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;

    img {
        width: 32px;
        height: 32px;
    }

    &:focus {
        outline: none;
    }

    &:hover {
        border: none;
        background-color: ${({ value }) => (value === "creator" ? "#FF3D3D" : "#307718")};;
    }

    background-color: ${({ value }) => (value === "creator" ? "#FF5D5D" : "#6cbd4f")};
`;

const ImgBox = styled.div`
    width: 400px;
    height: 300px;
    background-color: gray;
`;

const Container2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Process = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
`;

const Box = styled.div`
    width: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f8f8;
    padding: 10px;
    border-radius: 30px;

    span {
        text-align: center;
        padding-bottom: 20px;
    }
`;

const Num = styled.h2`
    font-size: 24px;
    font-weight: bolder;
    margin-bottom: 0;
`;

const Title = styled.h2<{ value: string }>`
    font-size: 20px;
    font-weight: bolder;
    color: ${({ value }) => (value === "creator" ? "#FF5D5D" : "#6cbd4f")};
`;
