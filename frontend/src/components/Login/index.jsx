import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link, useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiFunction from "../../actions/Api";

const Main = styled.main`
  min-height: 100vh;
  background: #e5e5e5;
  text-align: center;
`;

const MainContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  width: 28%;
  transform: translate(-50%, -50%);
  @media (max-width: 414px) {
    width: 90%;
  }
`;

const Container = styled.div`
  border-radius: 15px;
  background: #fff;
  text-align: center;
  padding: 1px 0px 23px 0px;
`;

const LoginHeader = styled.p`
  font-size: 24px;
  line-height: 16px;
  //   font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-align: center;
`;
const LoginButton = styled.button`
  //   font-family: Roboto;
  background: #47ddcb;
  border-radius: 8px;
  color: #fff;
  height: 35px;
  width: 120px;
  font-weight: bold;
  font-size: 21px;
  border: none;
`;

const Highlighted = styled.span`
  color: #47ddcb;
  font-weight: bold;
`;
const Links = styled(Link)`
  text-decoration-line: none;
`;

export const toastStyle = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Login = () => {
  const params = useParams();
  const [formObject, setFormObject] = useState({});
  const history = useHistory();
  useEffect(() => {
    if (
      localStorage.getItem("userCredentials") &&
      localStorage.getItem("userId")
    ) {
      history.push("/dashboard");
    }
  }, []);

  const handleSubmit = () => {
    const requestObject = {
      query: `
        query{
            login(email:"${formObject.email}",password:"${formObject.password}"){
                token
                userId
                tokenExpiration
            }
        }
      `,
    };
    ApiFunction(requestObject)
      .then((response) => {
        if (response.data.data.login.userId) {
          localStorage.setItem("userId", response.data.data.login.userId);
          localStorage.setItem(
            "userCredentials",
            response.data.data.login.token
          );
          history.push("/dashboard/events");
        }
      })
      .catch((err) => {
        toast(err.response.data.errors[0].message || "Couldn't Login");
      });
  };

  return (
    <Main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MainContainer>
        <Container>
          <LoginHeader>
            Sign{params.islogin === "true" ? " In" : " Up"}
          </LoginHeader>
          <form>
            <LoginForm formObject={formObject} setFormObject={setFormObject} />
          </form>
          <LoginButton onClick={handleSubmit}>
            Sign{params.islogin === "true" ? " In" : " Up"}
          </LoginButton>
        </Container>
        <p>
          have a user account?
          <Links to={`/login/${params.islogin === "true" ? "false" : "true"}`}>
            <Highlighted>
              {params.islogin !== "true" ? " Sign In" : " Sign Up Now"}
            </Highlighted>
          </Links>
        </p>
      </MainContainer>
    </Main>
  );
};
export default Login;
