import React, { useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { Payout } from "../types";
import usePagination from "../hooks/usePagination";
import { FetchDataFunction } from "../types/apiCalls.type";
import fetchPayoutData from "../services/dataService";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f0f0f0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const PaginationContainer = styled.div`
  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }

  li {
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;
    padding: 8px 12px;
    border: 1px solid #ccc;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .active {
    background-color: #4caf50;
    color: white;
    border: 1px solid #4caf50;
  }
`;

const PayoutTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const {
    totalPages,
    handlePageClick,
    data: payouts,
  } = usePagination<Payout>(
    searchTerm,
    fetchPayoutData as FetchDataFunction<Payout>
  );

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </SearchContainer>
      <Table>
        <TableHeader>
          <tr>
            <th>Date and Time</th>
            <th>Status</th>
            <th>Value</th>
            <th>Username</th>
          </tr>
        </TableHeader>
        <tbody>
          {payouts.map((payout, index) => (
            <TableRow key={index}>
              <TableCell>{payout.dateAndTime}</TableCell>
              <TableCell>{payout.status}</TableCell>
              <TableCell>{payout.value}</TableCell>
              <TableCell>{payout.username}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {totalPages > 0 && (
        <PaginationContainer>
          <ReactPaginate
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      )}
    </div>
  );
};

export default PayoutTable;
