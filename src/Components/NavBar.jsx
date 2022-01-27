import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import logo from "../Images/logo.png";
const { Item } = Menu;
const NavBar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return window.removeEventListener("resize", handleResize);
  }, [screenSize]);
  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }

  }, [screenSize]);
  return (
    <div className="nav-container">
      <div className="logo-container">
        <div style={{ display: "flex" }}>
          <Avatar
            src={logo}
            size="large"
            style={{ width: "55px", height: "50px" }}
          />
          <Typography.Title className="logo" level="2">
            <Link to="/">Cyberverse</Link>
          </Typography.Title>
          <Button
            className="menu-control-container"
            onClick={() => setActiveMenu(!activeMenu)}
          >
            <MenuOutlined />
          </Button>
        </div>
        {activeMenu && (
          <Menu theme="dark">
            <Item id="home" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Item>

            <Item id="cryptocurrencies" icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">CryptoCurrencies</Link>
            </Item>

            <Item id="exchanges" icon={<MoneyCollectOutlined />}>
              <Link to="/exchanges">Exchanges</Link>
            </Item>

            <Item id="news" icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default NavBar;
