import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import ApiFunction from "../../actions/Api";
import { toastStyle } from "../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  display: flex;
  margin-top: 106px;
`;

const Button = styled.button`
  background: #47ddcb;
  border-radius: 8px;
  color: #fff;
  height: 35px;
  width: 120px;
  font-weight: bold;
  font-size: 21px;
  border: none;
`;

const Input = styled.input`
  background-color: #edebeb;
  width: ${(props) => props.width};
  border: none;
  padding: 11px;
  margin-bottom: 23px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
`;
const TextArea = styled.textarea`
  background-color: #edebeb;
  width: 80%;
  max-width: 80%;
  border: none;
  padding: 11px;
  margin-bottom: 23px;
  min-height: 65px;
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.6);
`;

const PriceContainer = styled.div`
  display: inline-block;
  width: 80%;
`;

const ExtraContent = styled.div`
  flex: 0.7;
`;
const ExtraContent2 = styled.div`
  flex: 0.7;
`;
const Content = styled.div`
  flex: 1;
  text-align: center;
`;

const NewEvents = () => {
  const defaultEvent = {
    date: new Date(),
    title: "My Event",
    description: "this is my new event",
    price: 0,
  };
  const [formObject, setFormObject] = useState(defaultEvent);
  const handleChange = (key, value) => {
    setFormObject((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const requestObject = {
      query: `
          mutation createEvent($eventInput:EventInput){
                createEvent(eventInput:$eventInput){
                    title
                }
              }
          
        `,
      variables: {
        eventInput: {
          ...formObject,
          date: formObject.date.toISOString(),
          price: parseFloat(formObject.price),
        },
      },
    };
    ApiFunction(requestObject).then((res) => {
      console.log(res);
    });
  };

  return (
    <Container>
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
      <ExtraContent />
      <Content>
        <p>New Event</p>
        <Input
          onChange={(e) => handleChange("title", e.target.value)}
          value={formObject["title"]}
          width="80%"
          type="text"
          placeholder="Title"
        />
        <TextArea
          onChange={(e) => handleChange("description", e.target.value)}
          value={formObject["description"]}
          placeholder="Description..."
        />
        <PriceContainer>
          <Input
            onChange={(e) => handleChange("price", e.target.value)}
            value={formObject["price"]}
            type="number"
            placeholder="Price"
          />
          <DatePicker
            onChange={(date) => handleChange("date", date)}
            selected={formObject["date"]}
          />
        </PriceContainer>
        <Button onClick={handleSubmit}>Add</Button>
      </Content>
      <ExtraContent2 />
    </Container>
  );
};

export default NewEvents;
