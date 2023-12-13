import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

import { convertTimeFormat } from "../services/dateService";
import { FetchDataFunction, Payout, StatusProps } from "../types";
import fetchPayoutData from "../services/dataService";
import usePagination from "../hooks/usePagination";

const RootContainer = styled.div`
  padding: 0px 30px;
  margin-top: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 13px 13px;
`;

const StatusValue = styled.td<StatusProps>`
  background-color: ${({ status }) => {
    switch (status) {
      case "pending":
        return "#c1c4c7";
      case "completed":
        return "#14ae5c";
      default:
        return "";
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "pending":
        return "black";
      case "completed":
        return "white";
      default:
        return "";
    }
  }};
  padding: 3px 8px;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
  width: 300px;
`;

const Title = styled.h1`
  color: #272b30;
`;
const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubTitle = styled.h3`
  color: #272b30;
  padding-left: 7px;
`;

const SubTitleDiv = styled.div`
  background-color: #999dff;
  width: 16px;
  height: 30px;
  border-radius: 4px;
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
    background-color: #f0f0f0;
    color: white;
    border: 1px solid #f0f0f0;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const NoDataCell = styled.div`
  text-align: center;
  padding: 50px 0px;
`;

const PayoutTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    handlePageClick({ selected: 0 });
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
    <>
      <Title>Payouts</Title>
      <RootContainer>
        <TopContainer>
          <SubTitleContainer>
            <SubTitleDiv></SubTitleDiv>
            <SubTitle>Payout History</SubTitle>
          </SubTitleContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </TopContainer>

        <Table>
          <tr>
            <th className="text-alignment">Date and Time</th>
            <th className="text-alignment">Status</th>
            <th className="text-alignment">Value</th>
            <th className="text-alignment">Username</th>
          </tr>
          <tbody>
            {payouts.length ? (
              payouts.map((payout, index) => (
                <TableRow key={index}>
                  <TableCell>{convertTimeFormat(payout.dateAndTime)}</TableCell>
                  <TableCell>
                    <StatusValue status={payout.status.toLowerCase()}>
                      {payout.status}
                    </StatusValue>
                  </TableCell>
                  <TableCell>{payout.value}</TableCell>
                  <TableCell>{payout.username}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <NoDataCell>No Data Found!</NoDataCell>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
        {totalPages > 0 && (
          <PaginationContainer>
            <ReactPaginate
              breakLabel="..."
              pageCount={totalPages}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </PaginationContainer>
        )}
      </RootContainer>
    </>
  );
};

export default PayoutTable;
