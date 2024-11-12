import React, { useState, ReactElement } from 'react';
import Tab from './Tab';
import styled from "styled-components";

interface TabsProps {
    children: ReactElement[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const handleTabClick = (tabLabel: string) => {
        setActiveTab(tabLabel);
    };

    return (
        <TabsContainer>
            <TabList>
            {children.map((child) => (
                <Tab
                    key={child.props.label}
                    label={child.props.label}
                    onClick={() => handleTabClick(child.props.label)}
                    activeTab={activeTab}
                />
            ))}
            </TabList>
            <TabContent>
                {children.map((child) =>
                    child.props.label === activeTab ? child.props.children : null
                )}
            </TabContent>
        </TabsContainer>
    );
};

export default Tabs;

const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const TabList = styled.div`
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    gap: 2rem;
`;

const TabContent = styled.div`
    width: 100%;
    margin-top: 20px;
`;
