import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import SearchIcon from "../../assets/icons/icon_search.png";
import {viewDraftList} from "../../services/draftService.ts";
import {useNavigate} from "react-router-dom";
import RecordBox from "../forms/RecordBox.tsx";

interface Item {
    id: number;
    title: string;
    summary: {
        title: string;
        content: string;
        keywords: string[];
    } | null;
}

const TabRecordDetail: React.FC = () => {
    const [drafts, setDrafts] = useState<Item[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [throttledKeyword, setThrottledKeyword] = useState('');
    const navigate = useNavigate();

    const fetchDrafts = async () => {
        try {
            const response = await viewDraftList();
            setDrafts(response.data || []);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setThrottledKeyword(searchKeyword);
        }, 300);

        return () => clearInterval(interval);
    }, [searchKeyword]);

    const handleViewDetails = (id: number) => {
        navigate(`/draftplan/${id}`);
    };

    const filteredItems = drafts.filter(item =>
        item.title.toLowerCase().includes(throttledKeyword.toLowerCase())
    );

    return (
        <RecordDetail>
            <SearchBar>
                <img src={SearchIcon} alt="search icon"/>
                <Search
                    placeholder="검색어를 입력하세요..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </SearchBar>
            {filteredItems.map((item) => (
                <RecordBox
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    summary={item.summary?.content ?? ''}
                    onViewDetails={handleViewDetails}
                />
            ))}
        </RecordDetail>
    );
};

export default TabRecordDetail;

const RecordDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    gap: 1rem;
    padding-bottom: 2rem;

    @media (max-width: 768px) {
        gap: 0.8rem;
    }
`;

const SearchBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #f6f6f6;
    border-radius: 12px;
    margin-bottom: 0.2rem;

    img {
        width: 24px;
        height: auto;
        padding: 0.7rem;
    }
`;

const Search = styled.input`
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    background-color: #f6f6f6;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;
