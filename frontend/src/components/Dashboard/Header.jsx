import React from "react";
import styled from "styled-components";
import HeaderItem from "./HeaderItem";

const HeaderContainer = styled.div`
  width: 100%;
  background: #ebebeb;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  padding 0% 4%;
  position: fixed;
  top:0;
z-index: 100;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <>
        <HeaderItem content="Events" itemId="events" />
        <HeaderItem content="Bookings" itemId="bookings" />
        <HeaderItem content="New Events" itemId="newevent" />
      </>
      <HeaderItem content="Logout" itemId="logout" />
    </HeaderContainer>
  );
};

export default Header;
