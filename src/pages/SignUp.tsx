import {useEffect, useState} from "react";
import Layout from "../components/layout/Layout.tsx";
import RoleSelection from "../components/forms/RoleSelection.tsx";
import Join from "../components/forms/Join.tsx";
import JoinCompletion from "../components/forms/JoinCompletion.tsx";
import styled from "styled-components";
import {extractAndSaveToken} from "../services/authService.ts";

type JoinView = "roleSelection" | "Join" | "joinCompletion";

const SignUp = () => {
    const [currentView, setCurrentView] = useState<JoinView>("roleSelection");
    const [selectedRole, setSelectedRole] = useState<"CREATOR" | "PRODUCT_MANAGER" | null>(null);

    useEffect(() => {
        extractAndSaveToken();
    }, []);

    const renderContent = () => {
        switch (currentView) {
            case "roleSelection":
                return (
                    <RoleSelection
                        onSelectProductManager={() => {
                            setSelectedRole("PRODUCT_MANAGER");
                            setCurrentView("Join")
                        }}
                        onSelectCreator={() => {
                            setSelectedRole("CREATOR");
                            setCurrentView("Join")
                        }}
                    />
                );
            case "Join":
                return <Join
                    role={selectedRole}
                    onNext={() => setCurrentView("joinCompletion")}
                    onBack={() => setCurrentView("roleSelection")}/>;
            case "joinCompletion":
                return <JoinCompletion/>;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <Wrapper>
                <Container>
                    {renderContent()}
                </Container>
            </Wrapper>
        </Layout>
    )
}

export default SignUp;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const Container = styled.div`
    min-width: 50%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
