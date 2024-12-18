//import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import {UserProvider} from './contexts/UserContext.tsx';
import Onboarding from "./pages/Onboarding.tsx";
import DraftPlan from "./pages/DraftPlan.tsx";
import DraftDetailView from "./pages/DraftDetailView.tsx";
import RecommendDraft from "./pages/RecommendDraft.tsx";
import RecommendCreator from "./pages/RecommendCreator.tsx";
import Matching from "./pages/Matching.tsx";
import Mypage from "./pages/Mypage.tsx";
import SignUp from "./pages/SignUp.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <Wrapper>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Onboarding/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path="/draftplan" element={<DraftPlan/>}/>
                            <Route path="/draftplan/:id" element={<DraftDetailView/>}/>
                            <Route path="/recommendation/draft" element={<RecommendDraft/>}/>
                            <Route path="/recommendation/creator" element={<RecommendCreator/>}/>
                            <Route path="/matching/:matchingid" element={<Matching/>}/>
                            <Route path="/mypage" element={<Mypage/>}/>
                        </Routes>
                    </Router>
                </Wrapper>
            </UserProvider>
        </AuthProvider>
    )
}

export default App;

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    background-color: white;
`;


