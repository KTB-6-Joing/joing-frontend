//import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import styled from 'styled-components';

import Onboarding from "./pages/main/Onboarding.tsx";

const App = () => {
    return (
        <>
            <Wrapper>
                <Router>
                    <Routes>
                            <Route path="/" element={<Onboarding/>}/>
                    </Routes>
                </Router>
            </Wrapper>
        </>
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


