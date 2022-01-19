import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Row, Col, Card, Input } from "antd";

import { useGetCryptosQuery } from "../Services/cryptoApi";
const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [searchTerm, cryptosList]);
  if (isFetching) return "Loading...";
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(
          ({ uuid, rank, name, iconUrl, price, marketCap, change }) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={uuid}>
              <Link to={`/crypto/${uuid}`}>
                <Card
                  title={`${rank}. ${name}`}
                  extra={<img style={{width: "35px", height: "35px"}} src={iconUrl} className="crypto-image" />}
                  className="crypto-card-hover"
                  style={{borderRadius: "10px"}}
                >
                  <p>Price : {millify(price)}</p>
                  <p>MarketCap : {millify(marketCap)}</p>
                  <p>Change : {millify(change)}%</p>
                </Card>
              </Link>
            </Col>
          )
        )}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
