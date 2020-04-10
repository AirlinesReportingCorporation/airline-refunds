import React, { Component } from "react";

import * as moment from "moment";
import numeral from "numeral";
import axios from "axios";
import XLSX from "xlsx";

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
      refundList: []
    };
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(val) {
    this.setState({ filter: val });
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
    return (
      <div className="refundPage">
        <div className="refundJumbo">
          <h1>Airline Refund Information</h1>
          <p>
            The following airlines have elected to manage ARC accredited travel
            agency refunds directly and confirmed that decision with ARC.
            Refunds for these airlines have been inhibited through their GDSs
            and the ARC settlement system. To make it as easy as possible for
            agencies to contact airlines regarding refunds, ARC is providing
            relevant contact information* below.
          </p>

          <p>
            <small>
              <span style={{ fontWeight: "bold", color: "#189bb0" }}>
                Please note:
              </span>{" "}
              This information is provided as a resource by ARC. For specific
              airline policies and guidelines, please reference the airline’s
              website or contact the airline directly.
            </small>
          </p>
        </div>

        <div className="refundsTable">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="refundFilters">
                  <div className="refundFiltersTitle">Filters:</div>

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
                        onClick={this.setFilter.bind(this, "Via GDS (Reinstated)")}
                        className={
                          "optionGroupItem" +
                          (this.state.filter == "Via GDS (Reinstated)" ? " active" : "")
                        }
                      >
                        Via GDS (Reinstated)
                      </div>
                      <div
                        onClick={this.setFilter.bind(this, "Managing Directly")}
                        className={
                          "optionGroupItem" +
                          ((this.state.filter.indexOf("Managing Directly") > -1)
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
              <div className="col-lg-12">
                {this.state.filter &&
                  this.state.jsonData.map((data, i) => {
                    var className = "hide";

                    var filter = this.state.filter;
                    if (filter == "ALL") {
                      className = "show";
                    } else if (data["Refunds"].indexOf(this.state.filter) > -1) {
                      className = "show";
                    }

                    return (
                      <div key={i} className={className}>
                        <RefundRow  data={data} filters="filter" />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
