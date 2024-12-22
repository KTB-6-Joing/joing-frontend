import styled from "styled-components";
import {useEffect, useRef} from "react";

const baseURL = import.meta.env.VITE_IMG_BASE_URL;
const totalImages = 20; // 이미지 개수 설정
const images = Array.from({length: totalImages}, (_, i) =>
    `${baseURL}/SB_${String(i + 1).padStart(2, "0")}_GEN.png`
);

const StoryBoardScroll = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId: number | null = null;
        let scrollSpeed = 0.5; // 스크롤 속도 설정 (값이 클수록 빠름)

        const smoothScroll = () => {
            if (!container) return;

            container.scrollLeft += scrollSpeed;

            if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                container.scrollLeft = 0;
            }

            animationFrameId = requestAnimationFrame(smoothScroll);
        };

        animationFrameId = requestAnimationFrame(smoothScroll);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <ScrollContainer ref={scrollContainerRef}>
            {images.map((image, index) => (
                <ScrollItem key={index}>
                    <img
                        src={image}
                        alt={`Item ${index + 1}`}
                    />
                </ScrollItem>
            ))}
        </ScrollContainer>
    );
};

export default StoryBoardScroll;

const ScrollContainer = styled.div`
    display: flex;
    width: 100vw;
    overflow-x: scroll;
    scroll-snap-type: none;
    -webkit-overflow-scrolling: touch;
    gap: 16px;
    padding: 16px;
    margin-bottom: 5rem;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const ScrollItem = styled.div`
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: 150px;
    height: 150px;
    background: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: 100%;
    }
`;
