import React, { FC, useState, ChangeEvent } from "react";
import { FormInput, Card, FormButton, Form } from "../component";
import { Heading, Paragraph, HorizontalLine } from "../styling/css";
type SuperAdminSignUpProps = {};
const SuperAdminSignUp: FC = (props: SuperAdminSignUpProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Heading>SuperAdmin Signup</Heading>
      <Card>
        <div>
          <Paragraph>Fill in all required details.</Paragraph>
          <HorizontalLine />
        </div>
        <div style={{ padding: "2rem 2.5rem" }}>
          <Form>
            <FormInput
              label="First Name"
              type="text"
              value={formData.firstName}
              name="firstName"
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              label="Last Name"
              type="text"
              value={formData.lastName}
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <FormInput
              label="Password"
              type="password"
              value={formData.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <FormButton text="Create Super Admin" />
          </Form>
        </div>
      </Card>
    </>
  );
};
export default SuperAdminSignUp;