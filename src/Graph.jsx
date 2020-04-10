import React, { Component } from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryBar,
  VictoryAxis,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLabel
} from "victory";

import * as moment from "moment";
import numeral from "numeral";

/*
graphTitle: String
graphSubTitle: String
dataTitle: array String (2)
ytdLabels: arrray String (2)
data1
data2
data3
ytdData
dataDomain
*/

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      ticketToggle: true,
      salesToggle: true,
      thirdToggle: true
    };

    this.toggleTicket = this.toggleTicket.bind(this);
    this.toggleSales = this.toggleSales.bind(this);
    this.toggleThird = this.toggleThird.bind(this);
  }

  toggleTicket() {
    if (this.state.ticketToggle == false) {
      this.setState({ ticketToggle: true });
    } else {
      this.setState({ ticketToggle: false });
    }
  }

  toggleSales() {
    if (this.state.salesToggle == false) {
      this.setState({ salesToggle: true });
    } else {
      this.setState({ salesToggle: false });
    }
  }

  toggleThird() {
    if (this.state.thirdToggle == false) {
      this.setState({ thirdToggle: true });
    } else {
      this.setState({ thirdToggle: false });
    }
  }

  render() {
    //var dataTitle = ["Ticket Variance", "Sales Variance", "3?"];
    var dataTitle = this.props.dataTitle;

    //var ytdLabels = ["Ticket Variance vs. Same Week 2019", "Sales Variance vs. Same Week 2019", "3"]
    var ytdLabels = this.props.ytdLabels;

    /*
    var data = [
      { x: 1, a: new Date(2020, 2, 15), b: -45.2, c: -63.2 },
      { x: 2, a: new Date(2020, 2, 22), b: -80.0, c: -83.4 },
      { x: 3, a: new Date(2020, 2, 29), b: -88.5, c: -91.7 },
      { x: 4, a: new Date(2020, 3, 5), b: -92.3, c: -95.4 }
    ];
    */

    var data = this.props.data1;

    /*
    var data2 = [
      { x: 1, a: new Date(2020, 2, 15), b: -63.2 },
      { x: 2, a: new Date(2020, 2, 22), b: -83.4 },
      { x: 3, a: new Date(2020, 2, 29), b: -91.7 },
      { x: 4, a: new Date(2020, 3, 5), b: -95.4 }
    ];
    */

    var data2 = this.props.data2;

    var data3 = this.props.data3 ? this.props.data3 : "";

    //var ytdData = [-25.9, -30.5];

    var ytdData = this.props.ytdData;

    var tableHeaders = this.props.tableHeaders;

    var tableHeaderDisplay = tableHeaders.map(function(datum, i) {
      var arrLength = tableHeaders.length;
      var colSize = "col-4";

      if (arrLength == 4) {
        colSize = "col-3";
      }

      return (
        <div className={colSize} key={i}>
          {datum}
        </div>
      );
    });

    var graphDisplay = data.map(function(datum, i) {
      return (
        <div key={i} className="covid-row row d-flex flex-row">
          <div className={"d-flex" + (data3 ? " col-3" : " col-4")}>
            {moment(datum.a).format("MMMM D")} -
            {moment(datum.a)
              .add(7, "d")
              .format("MMM D")}
          </div>
          <div
            className={
              "d-flex align-items-center flex-row" + (data3 ? " col-3" : " col-4"
            )}
          >
            <div className="d-flex mainStatPercentChange">
              {numeral(datum.b).format("0.00")}%
            </div>
            <div className="d-flex mainStatPercentChangeBar">
              <div
                className="barChange"
                style={{ width: Math.abs(datum.b) + "%" }}
              ></div>
            </div>
          </div>
          <div
            className={
              "d-flex align-items-center flex-row" + (data3 ? " col-3" : " col-4"
            )}
          >
            <div className="d-flex mainStatPercentChange">
              {numeral(data2[i].b).format("0.00")}%
            </div>
            <div className="d-flex mainStatPercentChangeBar">
              <div
                className="barChange"
                style={{ width: Math.abs(data2[i].b) + "%" }}
              ></div>
            </div>
          </div>
          {data3 && (
            <div
              className={
                "d-flex align-items-center flex-row" + (data3
                  ? " col-3"
                  : " col-4")
              }
            >
              <div className="d-flex mainStatPercentChange">
                {numeral(data3[i].b).format("0.00")}%
              </div>
              <div className="d-flex mainStatPercentChangeBar">
                <div
                  className="barChange"
                  style={{ width: Math.abs(data3[i].b) + "%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      );
    });

    //var dataDomain = [10, 0, -10, -20, -30, -40, -50, -60, -70, -80, -90, -100];
    var dataDomain = this.props.dataDomain;

    var maxDomain = dataDomain[0];
    var minDomain = dataDomain[dataDomain.length - 1];

    var alternatingDataset = [];

    function alternatingData() {
      var arr = [];

      for (var i = 0; i < data.length; i = i + 2) {
        var num = data[i].x;
        arr.push({ x: num, b: minDomain, y0: maxDomain });
      }

      alternatingDataset = arr;
    }

    alternatingData();

    var realData = data;

    var dateDomain = [0.5];

    var valueDomain = [];

    for (var i = 0; i < data.length; i++) {
      valueDomain[i] = data[i].x;
    }

    for (var i = 1; i < data.length + 1; i++) {
      dateDomain[i] = i + 0.5;
    }

    return (
      <div className="container mt-5">
        <div className="graphTitle" style={{ marginTop: "60px" }}>
          {this.props.graphTitle}
        </div>
        <div className="graphSubTitle">{this.props.graphSubTitle}</div>

        <div className="graphToggleContainer d-flex flex-row">
          <div
            onClick={this.toggleTicket}
            className={
              "graphToggle d-flex flex-row " +
              (this.state.ticketToggle ? "active" : "")
            }
          >
            <div className="graphToggleCheckbox">
              <i className="fas fa-check"></i>
            </div>
            <div className="graphToggleLabel">
              <i className="fas fa-circle graphToggleKey1"></i> {dataTitle[0]}
            </div>
          </div>
          <div
            onClick={this.toggleSales}
            className={
              "graphToggle d-flex flex-row " +
              (this.state.salesToggle ? "active" : "")
            }
          >
            <div className="graphToggleCheckbox ">
              <i className="fas fa-check"></i>
            </div>
            <div className="graphToggleLabel">
              <i className="fas fa-circle graphToggleKey2"></i> {dataTitle[1]}
            </div>
          </div>
          {data3 && (
            <div
              onClick={this.toggleThird}
              className={
                "graphToggle d-flex flex-row " +
                (this.state.thirdToggle ? "active" : "")
              }
            >
              <div className="graphToggleCheckbox ">
                <i className="fas fa-check"></i>
              </div>
              <div className="graphToggleLabel">
                <i className="fas fa-circle graphToggleKey3"></i> {dataTitle[2]}
              </div>
            </div>
          )}
        </div>

        <VictoryChart
          width={1170}
          height={500}
          fixLabelOverlap={true}
          padding={{ left: 100, top: 30, bottom: 50, right: 50 }}
          containerComponent={
            <VictoryVoronoiContainer
              labelComponent={<VictoryTooltip />}
              labels={({ datum }) =>
                `${moment(datum.a).format("MMM D")} - ${moment(datum.a)
                  .add(7, "d")
                  .format("MMM D")}, ${numeral(datum.b).format("0.00")}%`
              }
              voronoiBlacklist={[
                "bulletPoints",
                "bulletPoints1",
                "bulletPoints2",
                "bulletPoints3",
                "bulletPoints4",
                "bulletPoints5",
                "bulletPoints6",
                "bulletPoints7",
                "bar"
              ]}
            />
          }
        >
          <VictoryAxis
            style={{
              grid: {
                stroke: "#818e99",
                strokeWidth: 0.5,
                fill: ({ t, i }) => (i > 0.5 ? "red" : "grey")
              }
            }}
            tickFormat={t => ``}
            tickValues={dateDomain}
          />

          <VictoryAxis
            style={{
              axis: { strokeWidth: 0 },
              grid: { strokeWidth: 0 },
              tickLabels: {
                textTransform: "uppercase",
                fontFamily: "SourceSansPro-Bold, arial, sans-serif",
                fontSize: "16px"
              }
            }}
            tickFormat={t => `${t}`}
            orientation="bottom"
            offsetY={50}
            tickValues={valueDomain}
            tickFormat={t => `${moment(data[t - 1].a).format("MMM D")}`}
            tickLabelComponent={<VictoryLabel />}
          />

          <VictoryAxis
            style={{
              grid: { stroke: "#818e99", strokeWidth: 0.5 }
            }}
            dependentAxis
            orientation="left"
            tickFormat={t => `${t}%`}
            tickValues={dataDomain}
            label="VARIANCE %"
            fixLabelOverlap={true}
            axisLabelComponent={<VictoryLabel dy={-30} />}
          />

          <VictoryBar
            name="bar"
            style={{ data: { fill: "#dddddd", opacity: ".2" } }}
            data={alternatingDataset}
            barRatio={1}
            y="b"
          />

          {this.state.ticketToggle && (
            <VictoryLine
              style={{
                data: { stroke: "#189bb0", strokeWidth: "2.5" }
              }}
              data={data}
              y="b"
            />
          )}

          {this.state.ticketToggle && (
            <VictoryScatter
              name="bulletPoints"
              style={{
                data: { fill: "#ffffff", stroke: "#cccccc", strokeWidth: "2" }
              }}
              size={9}
              data={data}
              y="b"
            />
          )}

          {this.state.ticketToggle && (
            <VictoryScatter
              name="bulletPoints2"
              style={{
                data: {
                  fill: "#ffffff",
                  stroke: "#189bb0",
                  strokeWidth: "2.5"
                }
              }}
              size={3}
              data={data}
              y="b"
            />
          )}

          {this.state.salesToggle && (
            <VictoryLine
              style={{
                data: { stroke: "#bbaf8b", strokeWidth: "2.5" }
              }}
              data={data2}
              y="b"
            />
          )}

          {this.state.salesToggle && (
            <VictoryScatter
              name="bulletPoints3"
              style={{
                data: { fill: "#ffffff", stroke: "#cccccc", strokeWidth: "2" }
              }}
              size={9}
              data={data2}
              y="b"
            />
          )}

          {this.state.salesToggle && (
            <VictoryScatter
              name="bulletPoints4"
              style={{
                data: { fill: "#ffffff", stroke: "#bbaf8b", strokeWidth: "2.5" }
              }}
              size={3}
              data={data2}
              y="b"
            />
          )}

          {this.props.data3 && this.state.thirdToggle && (
            <VictoryLine
              style={{
                data: { stroke: "#316677", strokeWidth: "2.5" }
              }}
              data={data3}
              y="b"
            />
          )}

          {this.props.data3 && this.state.thirdToggle && (
            <VictoryScatter
              name="bulletPoints5"
              style={{
                data: { fill: "#ffffff", stroke: "#cccccc", strokeWidth: "2" }
              }}
              size={9}
              data={data3}
              y="b"
            />
          )}

          {this.props.data3 && this.state.thirdToggle && (
            <VictoryScatter
              name="bulletPoints6"
              style={{
                data: { fill: "#ffffff", stroke: "#316677", strokeWidth: "2.5" }
              }}
              size={3}
              data={data3}
              y="b"
            />
          )}
        </VictoryChart>

        <div className="ytd-container">
          <div className="row no-gutters">
          <div className={"d-flex flex-row align-items-center" + (data3 ? " col-lg-4 " : " col-lg-6 ")}>
              <div className="ytd-symbol">YTD</div>
              <div className="ytd-data-container">
                <div className="ytd-data">{ytdData[0]}%</div>
                <div className="ytd-label">{ytdLabels[0]}</div>
              </div>
            </div>
            <div className={"d-flex flex-row align-items-center" + (data3 ? " col-lg-4 " : " col-lg-6 ")}>
              <div className="ytd-symbol">YTD</div>
              <div className="ytd-data-container">
                <div className="ytd-data">{ytdData[1]}%</div>
                <div className="ytd-label">{ytdLabels[1]}</div>
              </div>
            </div>
            {data3 && (
              <div className="col-lg-4 d-flex flex-row align-items-center">
                <div className="ytd-symbol">YTD</div>
                <div className="ytd-data-container">
                  <div className="ytd-data">{ytdData[2]}%</div>
                  <div className="ytd-label">{ytdLabels[2]}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="covid-table overflow-auto">
          <div className="row covid-headers">{tableHeaderDisplay}</div>
          {graphDisplay}
        </div>
      </div>
    );
  }
}

export default Graph;
