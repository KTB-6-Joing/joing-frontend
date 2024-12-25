import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";

const HorizontalScroll = ({children}: {
    children: React.ReactNode
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const getScrollDistance = () => {
        const width = window.innerWidth;
        if (width <= 480) {
            return 300; // 모바일
        } else if (width <= 768) {
            return 400; // 태블릿
        } else {
            return 550; // 데스크톱
        }
    };

    const updateButtonVisibility = () => {
        if (scrollRef.current) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: -getScrollDistance(), behavior: "smooth"});
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({left: getScrollDistance(), behavior: "smooth"});
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            updateButtonVisibility();
        }, 0);

        if (scrollRef.current) {
            scrollRef.current.addEventListener("scroll", updateButtonVisibility);
        }

        return () => {
            clearTimeout(timer);
            if (scrollRef.current) {
                scrollRef.current.removeEventListener("scroll", updateButtonVisibility);
            }
        };
    }, []);

    return (
        <Container>
            {showLeftButton && (
                <ScrollButton onClick={scrollLeft} position="left">
                    ←
                </ScrollButton>
            )}
            <ScrollBox ref={scrollRef}>{children}</ScrollBox>
            {showRightButton && (
                <ScrollButton onClick={scrollRight} position="right">
                    →
                </ScrollButton>
            )}
        </Container>
    )
}

export default HorizontalScroll;

const Container = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const ScrollBox = styled.div`
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    flex: 1;
    height: 100%;
`;

const ScrollButton = styled.button<{ position: string }>`
    cursor: pointer;
    color: #000000;
    background: ${({position}) =>
            position === "left"
                    ? "linear-gradient(to right, rgba(250, 250, 250, 1), rgba(255, 255, 255, 0), transparent)"
                    : "linear-gradient(to left, rgba(250, 250, 250, 1), rgba(255, 255, 255, 0), transparent)"};
    border: none;
    padding: 10px;
    transition: opacity 0.3s;
    position: absolute;
    height: 100%;
    width: 3rem;
    opacity: 0.8;
    ${({position}) => (position === "left" ? "left: 0;" : "right: 0;")}
    z-index: 10;

    &:focus {
        outline: none;
    }
`;
