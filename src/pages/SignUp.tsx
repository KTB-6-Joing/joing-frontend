import {useEffect, useState} from "react";
import Layout from "../components/layout/Layout.tsx";
import RoleSelection from "../components/modal/RoleSelection.tsx";
import Join from "../components/modal/Join.tsx";
import JoinCompletion from "../components/modal/JoinCompletion.tsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

type JoinView = "roleSelection" | "Join" | "joinCompletion";

const SignUp = () => {
    const [currentView, setCurrentView] = useState<JoinView>("roleSelection");
    const [selectedRole, setSelectedRole] = useState<"creator" | "planner" | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const existingToken = localStorage.getItem("accessToken");

        if (!existingToken) {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("token");

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);

                params.delete("token");
                const newUrl = `${window.location.origin}${window.location.pathname}`;
                window.history.replaceState({}, document.title, newUrl);
            }
        }
    }, []);

    const renderContent = () => {
        switch (currentView) {
            case "roleSelection":
                return (
                    <RoleSelection
                        onSelectPlanner={() => {
                            setSelectedRole("planner");
                            setCurrentView("Join")
                        }}
                        onSelectCreator={() => {
                            setSelectedRole("creator");
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
                return <JoinCompletion onClose={handleClose}/>;
            default:
                return null;
        }
    };

    const handleClose = () => {
        navigate("/");
    }

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
