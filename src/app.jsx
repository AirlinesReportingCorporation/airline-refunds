import React, { Component } from "react";

import * as moment from "moment";
import axios from "axios";
import XLSX from "xlsx";
import SimpleBar from "simplebar-react";

import RefundRow from "./RefundRow.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      jsonHeaders: [],
      jsonData: [],
      refundData: [],
      filter: "ALL",
      filterTicket: "ALL",
      filterObj: [],
      refundFilter: [],
      refundList: [],
      sortType: "asc"
    };
    this.setFilter = this.setFilter.bind(this);
    this.setTicketFilter = this.setTicketFilter.bind(this);
    this.setSort = this.setSort.bind(this);
  }

  setFilter(val) {
    this.setState({ filter: val });
  }

  setTicketFilter(val) {
    this.setState({ filterTicket: val });
  }

  setSort(val) {
    var jsonData1 = this.state.jsonData;

    if (val == "asc") {
      jsonData1.sort(propComparator("Name", 1));
    } else if (val == "code") {
      jsonData1.sort(propComparator("Numeric Code", 1));
    } else if (val == "recent") {
      jsonData1.sort(
        propComparator("Refund or Ticket Validity Information Last Updated", 1)
      );
    }

    console.log(jsonData1);

    console.log(val);

    this.setState({ sortType: val });

    this.setState({ jsonData: jsonData1 });
  }

  componentDidMount() {
    var e = this;
    //https://www2.arccorp.com/globalassets/support--training/agency-support/credit-refund-acceptance/cc-acceptance-chart.xlsx
    axios({
      method: "get",
      url:
        "https://www2.arccorp.com/globalassets/refunds/refunds.xlsx?" +
        new Date().toLocaleString(),
      responseType: "arraybuffer"
    }).then(function(response) {
      console.log("===== Refunds Chart Loaded ===== ");
      var data = new Uint8Array(response.data);
      var workbook = XLSX.read(data, { type: "array" });

      var workbookData = workbook["Sheets"]["ParticipatingCarriers"];

      //console.log(workbookData);

      var json = XLSX.utils.sheet_to_json(workbookData, { raw: false });

      var refundTypes = [];
      var jsonHeadersTemp = [];

      e.setState({ jsonData: json });

      //traverseEntireWorkBook
      for (var key in workbookData) {
        //value in cell
        var val = workbookData[key].w;

        var str = key.match(/[a-z]+|[^a-z]+/gi);

        if (str[1] === "1") {
          jsonHeadersTemp.push(val);
          //e.state.jsonHeaders[key[0]] = val; ///.replace(/ /g,"_").replace(":", "");
        }
        //console.log(val + ":" + str);
      }

      e.setState({ refundList: refundTypes });
      e.setState({ jsonHeaders: jsonHeadersTemp });

      //console.log(e.state.jsonHeaders);
      //console.log(e.state.jsonData);
    });
  }

  render() {
    const jsonHeaders = this.state.jsonHeaders;
    var filter = this.state.filter;
    console.log(moment.utc("6 Mar 17"));
    return (
      <div className="refundPage">
        <div className="refundJumboContainer">
          <div className="refundJumbo">
            <h1>Airline Refund and Exchange Information</h1>
            <p>
              As the travel industry contends with the challenges resulting from
              COVID-19, ARC aims to make it as easy as possible for travel
              agencies and airlines to manage high volumes of refunds. Use the
              filters below to view the airlines that have elected to manage
              refunds directly; those that have reinstated refunds in the GDS;
              and those that have extended ticket validity beyond the standard
              13 months.
            </p>

            <p>
              <small>
                <span style={{ fontWeight: "bold", color: "#189bb0" }}>
                  Please note:
                </span>{" "}
                This page is provided as a resource and is updated with
                information ARC receives from its participating airlines. It may
                not be comprehensive, and it is subject to change. For specific
                airline policies and guidelines, please reference the airline's
                website or contact the airline directly.
              </small>
            </p>
            <div>
              <a href="#agencyResources" className="ctaBtn">
                Agency Resources
              </a>
            </div>
          </div>
        </div>

        <div className="refundsTable">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="refundFiltersTitle">Filters:</div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <div className="refundFilters">
                  <div className="refundFiltersContainer">
                    <div className="refundFiltersLabel">Refunds</div>
                    <div className="optionGroup">
                      <div
                        onClick={this.setFilter.bind(this, "ALL")}
                        className={
                          "optionGroupItem" +
                          (this.state.filter == "ALL" ? " active" : "")
                        }
                      >
                        All
                      </div>
                      <div
                        onClick={this.setFilter.bind(this, "Via GDS")}
                        className={
                          "optionGroupItem" +
                          (this.state.filter == "Via GDS" ? " active" : "")
                        }
                      >
                        Via GDS
                      </div>
                      <div
                        onClick={this.setFilter.bind(
                          this,
                          "Via GDS (Reinstated)"
                        )}
                        className={
                          "optionGroupItem" +
                          (this.state.filter == "Via GDS (Reinstated)"
                            ? " active"
                            : "")
                        }
                      >
                        Via GDS (Reinstated)
                      </div>
                      <div
                        onClick={this.setFilter.bind(this, "Managing Directly")}
                        className={
                          "optionGroupItem" +
                          (this.state.filter.indexOf("Managing Directly") > -1
                            ? " active"
                            : "")
                        }
                      >
                        Managing Directly
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="refundFilters">
                  <div className="refundFiltersContainer">
                    <div className="refundFiltersLabel">Ticket Validity</div>
                    <div className="optionGroup">
                      <div
                        onClick={this.setTicketFilter.bind(this, "ALL")}
                        className={
                          "optionGroupItem" +
                          (this.state.filterTicket == "ALL" ? " active" : "")
                        }
                      >
                        All
                      </div>
                      <div
                        onClick={this.setTicketFilter.bind(this, "13 Months")}
                        className={
                          "optionGroupItem" +
                          (this.state.filterTicket == "13 Months"
                            ? " active"
                            : "")
                        }
                      >
                        13 Months
                      </div>
                      <div
                        onClick={this.setTicketFilter.bind(this, "> 13 Months")}
                        className={
                          "optionGroupItem" +
                          (this.state.filterTicket == "> 13 Months"
                            ? " active"
                            : "")
                        }
                      >
                        > 13 Months
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="refundFilters">
                  <div className="refundFiltersContainer">
                    <div className="refundFiltersLabel">Sort</div>
                    <div className="optionGroup">
                      <div
                        onClick={this.setSort.bind(this, "asc")}
                        className={
                          "optionGroupItem" +
                          (this.state.sortType == "asc" ? " active" : "")
                        }
                      >
                        Name
                      </div>
                      <div
                        onClick={this.setSort.bind(this, "code")}
                        className={
                          "optionGroupItem" +
                          (this.state.sortType == "code" ? " active" : "")
                        }
                      >
                        Numeric Code
                      </div>
                      <div
                        onClick={this.setSort.bind(this, "recent")}
                        className={
                          "optionGroupItem" +
                          (this.state.sortType == "recent" ? " active" : "")
                        }
                      >
                        Recent Changes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SimpleBar
              className="refundResults"
              autoHide={false}
              forceVisible="x"
            >
              <div className="row no-gutters">
                {this.state.filter &&
                  this.state.filterTicket &&
                  this.state.jsonData.map((data, i) => {
                    var comboTruth = false;
                    var refundShow = false;
                    var ticketShow = false;

                    var className = "hide";

                    var filter = this.state.filter;
                    var filterTicket = this.state.filterTicket;

                    //console.log(filterTicket);

                    if (filter == "ALL") {
                      refundShow = true;
                    } else if (
                      data["Refunds"].indexOf(this.state.filter) > -1
                    ) {
                      refundShow = true;
                    }

                    if (filterTicket == "ALL") {
                      ticketShow = true;
                    } else if (
                      filterTicket == "13 Months" &&
                      data["Ticket Validity"] == "13 Months"
                    ) {
                      ticketShow = true;
                    } else if (
                      filterTicket == "> 13 Months" &&
                      data["Ticket Validity"] != "13 Months"
                    ) {
                      ticketShow = true;
                    }

                    className = refundShow && ticketShow ? "show" : "hide";

                    return (
                      <div key={i} className={"col-lg-12 " + className}>
                        <RefundRow data={data} filters="filter" />
                      </div>
                    );
                  })}
              </div>
            </SimpleBar>
          </div>
        </div>

        <div className="legaleseContainer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <small>
                  As a courtesy to the industry, ARC is providing these
                  hyperlinks, which lead users to the airline's website that may
                  include, for example, ticketing, booking, refunds, exchange,
                  and schedule change rules. These hyperlinks are subject to
                  change without notice. ARC uses reasonable care in compiling
                  and presenting the hyperlink, but ARC gives no guarantee that
                  the content behind the hyperlink is complete, accurate, error
                  or virus free or up to date. Please note, the information
                  contained behind the hyperlink is not the sole source of
                  information from the airline and may not include all fare
                  rules/ticketing rules. Therefore, ARC recommends travel agents
                  take care to read all information published by the airline and
                  all rules for the fares being booked, ticketed and/or
                  refunded.
                </small>
              </div>
            </div>
          </div>
        </div>

        <div id="agencyResources" className="agencyResources">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Agency Resources</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h3>Chargeback FAQs</h3>
                <p>
                  The industry is seeing a significant increase in service- and
                  refund-related disputes compared to the typical fraud-related
                  chargebacks. These FAQs serve as a resource for “Terms and
                  Conditions” related disputes, which need to be managed
                  differently.
                </p>
                <a
                  target="_blank"
                  href="https://www2.arccorp.com/globalassets/refunds/covid-19-chargeback-dispute-management-faqs.pdf"
                  className="ctaBtn"
                >
                  View FAQs
                </a>
              </div>
              <div className="col-lg-6">
                <h3>ARC Pay Dispute FAQs</h3>
                <p>
                  During this challenging time, agencies may be experiencing an
                  influx of ARC Pay disputes. Here are the steps agencies need
                  to take to proactively address and respond to ARC Pay
                  transaction disputes and chargebacks.
                </p>
                <a
                  target="_blank"
                  href="https://www2.arccorp.com/globalassets/refunds/arc-pay-dispute-information-and-faqs.pdf"
                  className="ctaBtn"
                >
                  View FAQs
                </a>
              </div>
            </div>
            <div className="row" style={{marginTop: "30px"}}>
              <div className="col-lg-6">
                <h3>Cash Settlement FAQs</h3>
                <p>
                  Due to the state of the global travel community, travel
                  agencies are facing a level of refunds that is outpacing new
                  sales. These FAQs detail the changes ARC has made to ensure
                  the integrity of its core settlement functions.
                </p>
                <a
                  target="_blank"
                  href="https://www2.arccorp.com/globalassets/email/ARCCashSettlementFAQs-Agencies.pdf"
                  className="ctaBtn"
                >
                  View FAQs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function propComparator(val, inverse) {
  return function(a, b) {
    if (val == "Name" || val == "Numeric Code") {
      var x = a[val].toString().toLowerCase();
      var y = b[val].toString().toLowerCase();

      if (x < y) {
        return -1 * inverse;
      }
      if (x > y) {
        return 1 * inverse;
      }
    }

    if (val == "Refund or Ticket Validity Information Last Updated") {
      var x = a[val]
        ? parseInt(moment(a[val].replace(/-/g, " ")).format("YYYYMMDD"))
        : 1;
      var y = b[val]
        ? parseInt(moment(b[val].replace(/-/g, " ")).format("YYYYMMDD"))
        : 1;

      if (x < y) {
        console.log("before");
        return 1;
      }
      if (x > y) {
        console.log("after");
        return -1;
      }
    }

    return 0;
  };
}

export default App;
