//import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';
import { UserProvider } from './contexts/UserContext.tsx';
import Onboarding from "./pages/Onboarding.tsx";
import DraftPlan from "./pages/DraftPlan.tsx";
import DraftDetailView from "./pages/DraftDetailView.tsx";

const App = () => {
    return (
        <UserProvider>
            <Wrapper>
                <Router>
                    <Routes>
                        <Route path="/" element={<Onboarding/>}/>
                        <Route path="/draftplan" element={<DraftPlan/>}/>
                        <Route path="/draftplan/:index" element={<DraftDetailView />} />
                    </Routes>
                </Router>
            </Wrapper>
        </UserProvider>
    )
}

export default App;

const Wrapper=styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
`;


