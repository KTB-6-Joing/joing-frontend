import React, {useState} from 'react';
import styled from "styled-components";
import Toggle from "../../components/toggle/Toggle.tsx";
import Layout from "../../components/layout/Layout.tsx";
import iconArrow from '../../assets/icons/icon_arrow.png';

const Onboarding: React.FC = () => {
    const [toggleValue, setIsToggled] = useState("creator");

    const handleToggleChange = (newValue: string) => {
        setIsToggled(newValue);
    };

    return (
        <Layout>
            <Container>
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
            </Container>
            <Process>
                <Box>

                </Box>
            </Process>
        </Layout>
    )
}

export default Onboarding;

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
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
        ${({value}) =>
                value === "creator" ? "background-color: #ff5d5d;" : "background-color: #307718;"}
    }

    ${({value}) =>
            value === "creator" ? "background-color: #ff8484;" : "background-color: #6cbd4f;"}
`;

const ImgBox = styled.div`
    width: 400px;
    height: 500px;
    background-color: gray;
`;

const Process = styled.div`

`;

const Box = styled.div`

`;
