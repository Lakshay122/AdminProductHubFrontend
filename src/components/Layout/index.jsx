import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AppLayoutLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Function to toggle the collapsed state of the Sider
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ height: "100vh" }}>
      {/* Sidebar component */}
      <Sider
        trigger={null}
        collapsible
        zeroWidthTriggerStyle={true}
        breakpoint="xs"
        onCollapse={toggleCollapsed}
        collapsed={collapsed}
      >
        <p className="logo-header">UserProduct Mananger</p>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => {
              // here i can't use navigate func because it is only allowed in route components so i use this instead for redirecting
              window.location.href = "/";
            }}
          >
            Dashboard
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              // here i can't use navigate func because it is only allowed in route components so i use this instead for redirecting
              window.location.href = "/";
            }}
            style={{
              backgroundColor: "red",
              marginTop: "20px",
            }}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* Header component */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignContent: "center",
            justifyContent: "start",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content className="content">{children}</Content>
      </Layout>
    </Layout>
  );
};
export default AppLayoutLayout;
