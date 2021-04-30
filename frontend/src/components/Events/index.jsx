import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ApiFunction from "../../actions/Api";

const ItemContainer = styled.div`
  margin: 136px 100px;
`;

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 0px;
`;

const Table = styled.table`
  background: #eeeeee;
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
`;

const Header = styled.th`
  padding: 8px;
  border-right: ${(props) => props.border};
`;

const Data = styled.td`
  max-width: 200px;
  border-right: ${(props) => props.border};
  text-align: center;
  border-top: 1px solid;
`;

const Events = () => {
  const [headings, setHeadings] = useState([
    "S. No",
    "Title",
    "Description",
    "Date",
  ]);
  const [tableContents, setTableContents] = useState([]);

  const fetchEvents = () => {
    const requestObject = {
      query: `
        query{
            events{
                title
                description
                date
            }
        }
      `,
    };
    ApiFunction(requestObject).then(
      (response) => {
        console.log(response.data.data);
        setTableContents(response.data.data.events);
      },
      (error) => {
        throw error;
      }
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <ItemContainer>
      <Title>Events</Title>
      <Table>
        <tr>
          {headings.map((h, i) => (
            <Header
              key={i}
              border={i !== headings.length - 1 ? "1px solid black" : ""}
            >
              {h}
            </Header>
          ))}
        </tr>
        {tableContents.length
          ? tableContents.map((content, i) => {
              const date = new Date(parseInt(content.date));
              return (
                <tr key={i}>
                  <Data border="1px solid black">{i}</Data>
                  <Data border="1px solid black">{content.title}</Data>
                  <Data border="1px solid black">{content.description}</Data>
                  <Data border="">{date.toISOString()}</Data>
                </tr>
              );
            })
          : null}
      </Table>
    </ItemContainer>
  );
};

export default Events;
