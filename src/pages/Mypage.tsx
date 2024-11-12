//import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout.tsx";
import {useUser} from '../contexts/UserContext.tsx'
import Tabs from "../components/tab/Tabs.tsx";
import TabPanel from "../components/tab/TabPanel.tsx";
import React from "react";
import TabProfileDetail from "../components/tab/TabProfileDetail.tsx";

const Mypage= () => {


    return (
        <Layout>
            <Container>
                <HeaderComponent>
                    <Profile>
                        <ProfileImg></ProfileImg>
                        <ProfileDetail>
                            <Name>Ellie Park</Name>
                            <ChannelType>Youtube</ChannelType>
                        </ProfileDetail>
                    </Profile>
                    <EditButton>Edit</EditButton>
                </HeaderComponent>
                <Tabs>
                    <TabPanel label="Profile">
                        <TabProfileDetail />
                    </TabPanel>
                    <TabPanel label="Record">
                        {/*<TabRecordDetail />*/}
                    </TabPanel>
                </Tabs>
            </Container>
        </Layout>
    );
};

export default Mypage;

const Container = styled.div`
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const HeaderComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem;
    width: 100%;
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
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: gray;
`;

const ProfileDetail = styled.div``;

const Name = styled.h3`
    font-family: 'GongGothicMedium', serif;
`;

const ChannelType = styled.p`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.9rem;
`;

const EditButton = styled.button`
    font-family: 'SUITE-Bold', serif;
    font-size: 0.8rem;
    padding: 0.4rem 1rem;
    background-color: #f3f3f3;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #dadada;
        border: none;
    }

    &:focus {
        outline: none;
    }
`;
