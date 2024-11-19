import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import SearchIcon from "../../assets/icons/icon_search.png";
import RecordBox from "../box/RecordBox.tsx";
import {ViewDraftList} from "../../services/draftService.ts";

const TabRecordDetail: React.FC = () => {
    const [Drafts, setDrafts] = useState<{ title: string; summary: string }[]>([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const fetchDrafts = async () => {
        try {
            const response = await ViewDraftList();
            setDrafts(response.data || []);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const handleViewDetails = () => {

    };

    const filteredItems = Drafts.filter(item =>
        item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <>
            <SearchBar>
                <img src={SearchIcon} alt="search icon"/>
                <Search
                    placeholder="검색어를 입력하세요..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </SearchBar>
            {filteredItems.map((item, index) => (
                <RecordBox
                    key={index}
                    title={item.title}
                    summary={item.summary}
                    onViewDetails={handleViewDetails}
                />
            ))}
        </>
    );
};

export default TabRecordDetail;

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
    border-radius: 4px;
    font-size: 16px;
    background-color: #f6f6f6;
    
    &:focus {
        outline: none;
        border-color: #007bff;
    }
`;
