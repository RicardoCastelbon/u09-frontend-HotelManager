import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .bookings {
    overflow-y: scroll;
  }
  table {
    table-layout: auto;
    width: 100%;
  }
  th,
  td {
    padding: 0.2rem;
  }
  th {
    background-color: var(--primary-500);
    color: white;
    font-weight: 300;
    text-transform: capitalize;
    text-align: left;
  }
  .border-radius-left {
    border-radius: 5px 0px 0px 5px;
  }
  .border-radius-right {
    border-radius: 0px 5px 5px 0px;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }

`;
export default Wrapper;
