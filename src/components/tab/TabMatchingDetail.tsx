import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {ItemStatus} from "../../constants/itemStatus.ts";
import {matchingList} from "../../services/matchingService.ts";
import MatchingBox from "../forms/MatchingBox.tsx";

interface Matching {
    matchingId: number;
    title: string;
    status: ItemStatus;
}

const TabRecordDetail: React.FC = () => {
    const [matching, setMatching] = useState<Matching[]>([]);
    const navigate = useNavigate();

    const fetchMatching = async() => {
        try{
            const response = await matchingList();
            setMatching(response.data || []);
        } catch (error) {
            console.error("Error fetching matching:", error);
        }
    };

    useEffect(() => {
        fetchMatching();
    }, []);

    const handleViewDetails = (id: number) => {
        navigate(`/matching/${id}`);
    };

    return (
        <MatchingDetail>
            {matching.map((item: Matching) => (
                <MatchingBox
                    key={item.matchingId}
                    id={item.matchingId}
                    title={item.title}
                    status={item.status}
                    onViewDetails={handleViewDetails}
                />
            ))}
        </MatchingDetail>
    )
};

export default TabRecordDetail;

const MatchingDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 1rem;
    padding-bottom: 2rem;
`;
