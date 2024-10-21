import Header from "./Header.tsx";
import styled from 'styled-components';

const Layout = (props: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Header />
            <Main>
                {props.children}
            </Main>
        </>
    )
}

export default Layout;

const Main = styled.main`
    width: 70%;
    margin: 0 auto;
`;
