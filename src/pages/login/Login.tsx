import React, { useMemo } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { createToken, LoginBody } from "../../api/user";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useToast } from "../../hooks/toast";

const LoginForm = styled.div`
  max-width: 400px;
  margin: 30px auto;
`;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = (props: any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const onFinish = async (values: LoginBody) => {
    try {
      console.log("Success:", values);
      await createToken(values);
      history.push("/");
      addToast({
        type: "success",
        title: "Cadastro realizado!",
        description: "Você já pode fazer seu logon no GoBarber!",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: "登陆失败",
        description: "Você já pode fazer seu logon no GoBarber!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return useMemo(() => (
    <LoginForm>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish as any}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginForm>
  ),[]);
};

export default Login;
