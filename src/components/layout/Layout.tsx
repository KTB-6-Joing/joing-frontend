import Header from "./Header.tsx";
import styled from 'styled-components';
import AuthModal from "../modal/AuthModal.tsx";
import React, {useCallback, useEffect, useState} from "react";
import NoticeModal, {Notice} from "../modal/NoticeModal.tsx";

const Layout = (props: {
    children: React.ReactNode
}) => {
    const [isOpenAuthModal, setOpenAuthModal] = useState<boolean>(false);
    const [isOpenNoticeModal, setOpenNoticeModal] = useState<boolean>(false);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<number>(0);
    const [isShaking, setIsShaking] = useState<boolean>(false);

    useEffect(() => {
        const eventSource = new EventSource("/api/v1/matching/subscribe");

        eventSource.onmessage = (event) => {
            const data: Notice = JSON.parse(event.data);

            const storedNotices = localStorage.getItem('notices');
            const updatedNotices = storedNotices ? [...JSON.parse(storedNotices), data] : [data];
            localStorage.setItem('notices', JSON.stringify(updatedNotices));

            setNotices(updatedNotices);
            setUnreadMessages((prev) => prev + 1);

            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
            }, 2000);
        };

        eventSource.onerror = () => {
            console.error("SSE connection error");
            eventSource.close();
        };

        return () => {
            eventSource.close(); // 컴포넌트 언마운트 시 연결 종료
        };
    }, []);

    useEffect(() => {
        const storedNotices = localStorage.getItem('notices');
        if (storedNotices) {
            setNotices(JSON.parse(storedNotices));
        }
    }, []);

    const handleDeleteNotice = (id: number) => {
        const updatedNotices = notices.filter((notice) => notice.notificationId !== id);
        setNotices(updatedNotices);
        localStorage.setItem('notices', JSON.stringify(updatedNotices));
    };

    const handleLoginClick = useCallback(() => {
        setOpenAuthModal(!isOpenAuthModal);
    }, [isOpenAuthModal]);

    const handleNoticeClick = useCallback(() => {
        setOpenNoticeModal((prev) => !prev);
        if (!isOpenNoticeModal) {
            setUnreadMessages(0);
        }
    }, []);

    const handleCloseAuthModal = useCallback(() => {
        setOpenAuthModal(false);
    }, []);

    const handleCloseNoticeModal = useCallback(() => {
        setOpenNoticeModal(false);
    }, []);

    return (
        <>
            <Header
                onLoginClick={handleLoginClick}
                onNoticeClick={handleNoticeClick}
                isNoticeModalOpen={isOpenNoticeModal}
                unreadMessages={unreadMessages}
                isShaking={isShaking}
            />
            <Main>
                {props.children}
            </Main>
            {isOpenAuthModal && (
                <AuthModal handleClose={handleCloseAuthModal}/>
            )}
            {isOpenNoticeModal && (
                <NoticeModal notices={notices} onClose={handleCloseNoticeModal} onDelete={handleDeleteNotice}/>
            )}
        </>
    )
}

export default Layout;

const Main = styled.main`
    width: 70%;
    height: calc(100vh - 60px);
    margin: 60px auto 0 auto;
`;
