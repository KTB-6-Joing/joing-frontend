import React from 'react';
import styled from 'styled-components';
import crossIcon from '../../assets/icons/icon_cross.png';

export interface Notice {
    notificationId: number;
    content: string;
    relatedUrl: string;
}

interface NoticeModalProps {
    notices: Notice[];
    onClose: () => void;
    onDelete: (id: number) => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({notices, onClose, onDelete}) => {
    return (
        <ModalContainer onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <Header>
                    <p>알림</p>
                </Header>
                <NoticeList>
                    {notices.map((notice) => (
                        <NoticeItem key={notice.notificationId}
                                    onClick={() => window.open(notice.relatedUrl, '_blank')}>
                            <NoticeDescription>
                                {notice.content}
                            </NoticeDescription>
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                onDelete(notice.notificationId);
                            }}>
                                <img src={crossIcon} alt="delete icon"/>
                            </DeleteButton>
                        </NoticeItem>
                    ))}
                </NoticeList>
            </ModalContent>
        </ModalContainer>
    );
};

export default NoticeModal;

const ModalContainer = styled.div`
    position: fixed;
    top: 60px;
    right: 0;
    width: 100%;
    height: calc(100% - 60px);;
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
`;

const ModalContent = styled.div`
    width: 400px;
    background: white;
    border-radius: 8px;
    margin: 1rem;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    max-height: 25rem;
    overflow-y: auto;
`;

const Header = styled.div`
    padding: 0.8rem;
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;

    p {
        font-size: 1rem;
        font-weight: bold;
        margin: 0;
    }
`;

const NoticeList = styled.div`
    max-height: 21rem;
    overflow-y: auto;
`;

const NoticeItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }
`;

const NoticeDescription = styled.div`
    font-size: 0.8rem;
    color: #555;
    margin: 4px 0;
`;

const DeleteButton = styled.button`
    border: none;
    padding: 4px;
    cursor: pointer;
    background-color: transparent;

    img {
        width: 8px;
        height: auto;
    }

    &:hover {
        transform: scale(1.2);
    }

    &:focus {
        outline: none;
    }
`;
