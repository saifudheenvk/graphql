import React, { useEffect } from "react";
import { useHistory, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import { DashboardConfig } from "./DashboardConfig";

const Content = styled.div`
  margin-top: 6%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Dashboard = () => {
  const history = useHistory();
  useEffect(() => {
    if (
      !(
        localStorage.getItem("userCredentials") &&
        localStorage.getItem("userId")
      )
    ) {
      history.push("/");
    }
  }, []);
  return (
    <Container>
      <Header />
      <Content>
        {DashboardConfig.map((item) => (
          <Route key={item.url} path={item.url} component={item.component} />
        ))}
        <Route
          path="/dashboard"
          exact
          render={() => <Redirect to={`/dashboard/events`} />}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
