import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeaderItemContainer = styled.div`
  flex: 1;
  padding-left: 3%;
`;

const Content = styled.p`
  background-color: ${(props) => props.background};
  width: 121px;
  padding: 5px 20px;
  border-radius: 8px;
  color: ${(props) => props.color};
  font-weight: bold;
  border: 1px solid #47ddcb;
  text-align: center;
  cursor: pointer;
`;

const HeaderItem = (props) => {
  const history = useHistory();
  const handleClick = () => {
    if (props.itemId === "logout") {
      localStorage.clear();
      history.push("/");
    } else {
      history.push(`/dashboard/${props.itemId}`);
    }
  };

  return (
    <HeaderItemContainer>
      <Content
        onClick={handleClick}
        color={props.content === "Logout" ? "#FFF" : "#47DDCB"}
        background={
          props.content === "Logout"
            ? "#47DDCB"
            : !window.location.href.includes(props.itemId)
            ? "#fff"
            : "#EDEBEB"
        }
      >
        {props.content}
      </Content>
    </HeaderItemContainer>
  );
};

export default HeaderItem;