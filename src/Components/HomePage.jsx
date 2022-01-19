import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../Services/cryptoApi";
import { CryptoCurrencies, News } from ".";

const { Title } = Typography;
const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  if (isFetching) return "Loading...";

  const globalStats = data?.data?.stats;
  return (
    <React.Fragment>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            span={12}
            title="Total Cryptocurrencies"
            value={globalStats.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            span={12}
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            span={12}
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            span={12}
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>

        <Col span={12}>
          <Statistic
            span={12}
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 CryptoCurrences in the world</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>

      </div>
      <CryptoCurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">Lastest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>

      </div>
      <News simplified/>
    </React.Fragment>
  );
};

export default HomePage;
