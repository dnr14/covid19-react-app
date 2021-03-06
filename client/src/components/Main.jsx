import React, { useRef, useState } from "react";
import {
  Loading,
  Title,
  Row,
  Col,
  MaxWidthContainer,
  MainChartContainer,
  DateShow,
  CovidSearch,
} from "assets/style/styled";
import useCurrentDivWidth from "hooks/useCurrentDivWidth";
import getInitialDate from "util/DateUtil.js";
import { BarChartTitleEnum, LineChartTitleEnum } from "util/ChartTitleEnum";
import useCovidApiCall from "hooks/useCovidApiCall";
import ToggleBtn from "./ToggleBtn";
import Modal from "./Modal";
import LineChart from "./chart/LineChart";
import BarChart from "./chart/BarChart";
import List from "./List";
import SearchContainer from "./SearchContainer";

const Main = () => {
  const [date, setDate] = useState(getInitialDate());
  const [modalOnOff, setModalOnOff] = useState({
    current: false,
    titles: [],
  });
  const divRef = useRef(null);
  const covidApiData = useCovidApiCall(date);
  const currentDivWidth = useCurrentDivWidth(divRef);
  const [currnetProperty, setCurrnetProperty] = useState("deathCnt");

  return (
    <section id="Main">
      {covidApiData.isShow && <Loading />}
      <Row>
        <Col>
          <MaxWidthContainer>
            <Modal modalOnOff={modalOnOff} setModalOnOff={setModalOnOff} />
            <Title>코로나 데이터를 시각화로 확인해보세요.</Title>
            <DateShow>
              <span>검색한 데이터 날짜</span>
              <span>{date.startData}</span>
              <span>~</span>
              <span>{date.endData}</span>
            </DateShow>
            <CovidSearch>
              <SearchContainer
                setModalOnOff={setModalOnOff}
                setDate={setDate}
                covidApiData={covidApiData}
              />
            </CovidSearch>

            <MainChartContainer>
              <div ref={divRef}>
                <List
                  currnetProperty={currnetProperty}
                  setCurrnetProperty={setCurrnetProperty}
                />
                <ToggleBtn />
                <LineChart
                  divWidth={currentDivWidth._100}
                  items={covidApiData.data}
                  dataProperty={currnetProperty}
                  chartTitle={LineChartTitleEnum[`${currnetProperty}`].title}
                  bottomText={
                    LineChartTitleEnum[`${currnetProperty}`].bottomText
                  }
                />
                <BarChart
                  divWidth={currentDivWidth._100}
                  items={covidApiData.data}
                  dataProperty={currnetProperty}
                  chartTitle={BarChartTitleEnum[`${currnetProperty}`].title}
                  bottomText={
                    BarChartTitleEnum[`${currnetProperty}`].bottomText
                  }
                />
              </div>
            </MainChartContainer>
          </MaxWidthContainer>
        </Col>
      </Row>
    </section>
  );
};

export default Main;
