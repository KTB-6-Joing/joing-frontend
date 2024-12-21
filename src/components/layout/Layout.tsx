import Header from "./Header.tsx";
import styled from 'styled-components';
import AuthModal from "../modal/AuthModal.tsx";
import React, {useCallback, useEffect, useState} from "react";
import NoticeModal, {Notice} from "../modal/NoticeModal.tsx";
import {EventSourcePolyfill} from "event-source-polyfill";
import {useUser} from "../../contexts/UserContext.tsx";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Layout = (props: {
    children: React.ReactNode
}) => {
    const [isOpenAuthModal, setOpenAuthModal] = useState<boolean>(false);
    const [isOpenNoticeModal, setOpenNoticeModal] = useState<boolean>(false);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [unreadMessages, setUnreadMessages] = useState<number>(0);
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const {role} = useUser();

    useEffect(() => {
        let eventSource: EventSourcePolyfill | null = null;

        if (role !== null) {
            const token = localStorage.getItem('accessToken') || '';

            eventSource = new EventSourcePolyfill(`${apiUrl}/api/v1/notification/subscribe`, {
                headers: {
                    access: token,
                    heartbeatTimeout: `${5 * 60 * 1000}`
                },
            });

            eventSource.onmessage = (event) => {
                const isJSON = (str: string) => {
                    try {
                        JSON.parse(str);
                        return true;
                    } catch {
                        return false;
                    }
                };

                if (isJSON(event.data)) {
                    const data: Notice = JSON.parse(event.data);

                    const storedNotices = localStorage.getItem('notices');
                    const updatedNotices = storedNotices
                        ? [...JSON.parse(storedNotices), data]
                        : [data];
                    const sortedNotices = updatedNotices.sort((a: Notice, b: Notice) => b.notificationId - a.notificationId);

                    localStorage.setItem('notices', JSON.stringify(sortedNotices));
                    setNotices(updatedNotices);
                    setUnreadMessages((prev) => prev + 1);

                    setIsShaking(true);
                    setTimeout(() => {
                        setIsShaking(false);
                    }, 5000);
                }
            };

            eventSource.onerror = () => {
                eventSource?.close();
                setTimeout(() => {
                    if (role !== null) {
                        eventSource = new EventSourcePolyfill(`${apiUrl}/api/v1/notification/subscribe`, {
                            headers: {
                                access: token,
                            },
                        });
                    }
                }, 1000);
            };
        }

        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [role]);

    useEffect(() => {
        const storedNotices = localStorage.getItem('notices');
        if (storedNotices) {
            const parsedNotices = JSON.parse(storedNotices);
            const sortedNotices = parsedNotices.sort((a: Notice, b: Notice) => b.notificationId - a.notificationId);

            setNotices(sortedNotices);
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
