import React from 'react';

interface TabPanelProps {
    label: string;
    children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({label, children}) => (
    <div data-label={label}>{children}</div>
);

export default TabPanel;
