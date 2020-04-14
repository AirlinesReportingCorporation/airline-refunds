import React, { Component } from "react";

class RefundRow extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };

    this.clickToggle = this.clickToggle.bind(this);
  }

  clickToggle() {
    if (this.state.toggle == false) {
      this.setState({ toggle: true });
    } else {
      this.setState({ toggle: false });
    }
  }

  render() {
    var data = this.props.data;
    var filter = this.props.filters;

    var refundClass = "refundRegular";

    if (data["Refunds"].indexOf("Managing Directly") > -1 || data["Instructions 1"] || data["Instructions 2"] || data["Instructions 3"]) {
      refundClass = "refundDownload";
    }

    return (
      <div className="refundRow">
        <div className="refundRowTop">
          <div className="container-fluid">
            <div className="row no-gutters align-items-center">
              <div className="col-3">
                <div className="refundName">
                  <a href={data["Website"]} target="_blank">
                    {data["Name"]}
                  </a>
                </div>
              </div>
              <div className="col-3">
                <span className="refundLabel">Designator:</span>{" "}
                {data["Designator"]}
              </div>
              <div className="col-3">
                <span className="refundLabel">Numeric Code:</span>{" "}
                {data["Numeric Code"]}
              </div>

              {(data["Refund or Ticket Validity Information Last Updated"]) && (<div className="col-3">
                <span className="refundLabel">Date Updated:</span>
                {data["Refund or Ticket Validity Information Last Updated"]}
              </div>)}
            </div>
          </div>
        </div>
        <div className="refundRowBottom">
          <div className="container-fluid">
            <div className="row no-gutters align-items-center">
              <div className="col-3">
                <div className="refundLabel">Refunds</div>
                <div
                  onClick={
                    refundClass == "refundDownload" ? this.clickToggle : function(){ console.log("")}
                  }
                  className={"refundPolicy" + " " + refundClass}
                >
                  {data["Refunds"]}
                  {refundClass == "refundDownload" && (
                    <i className="fas fa-arrow-down"></i>
                  )}
                </div>
              </div>
              <div className="col-3">
                <span className="refundLabel">Ticket Validity:</span>
                {data["Ticket Validity"]}
              </div>
              {(data["Phone"] || data["Email"]) && (
                <div className="col-6">
                  <a onClick={this.clickToggle}>View Contact Information</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={"refundRowInfo" + (this.state.toggle ? " show" : "")}>
          <div className="container-fluid">
            <div className="row no-gutters">
              {(data["Instructions 1"] ||
                data["Instructions 2"] ||
                data["Instructions 3"]) && (
                <div className="col-6">
                  <div className="refundLabel">Instructions</div>
                  {data["Instructions 1"] && (
                    <div className="instructionsContainer">
                      {data["Instructions 1"].split(" ").map((item, i) => {
                        if (item.indexOf("http") > -1) {
                          item = (
                            <a href={item} target="_blank">
                              {item}
                            </a>
                          );
                        }
                        return <span key={i}>{item} </span>;
                      })}
                    </div>
                  )}

                  {data["Instructions 2"] && (
                    <div className="instructionsContainer">
                      {data["Instructions 2"].split(" ").map((item, i) => {
                        if (item.indexOf("http") > -1) {
                          item = (
                            <a href={item} target="_blank">
                              {item}
                            </a>
                          );
                        }
                        return <span key={i}>{item} </span>;
                      })}
                    </div>
                  )}

                  {data["Instructions 3"] && (
                    <div className="instructionsContainer">
                      {data["Instructions 3"].split(" ").map((item, i) => {
                        if (item.indexOf("http") > -1) {
                          item = (
                            <a href={item} target="_blank">
                              {item}
                            </a>
                          );
                        }
                        return <span key={i}>{item} </span>;
                      })}
                    </div>
                  )}
                </div>
              )}
              {(data["Phone"] || data["Email"]) && (
                <div className="col-6">
                  {data["Phone"] && (
                    <div>
                      <span className="refundLabel">Phone:</span>
                      {data["Phone"]}
                    </div>
                  )}

                  {data["Email"] && (
                    <div>
                      <span className="refundLabel">Email:</span>
                      <a href={"mailto:" + data["Email"]}>{data["Email"]}</a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RefundRow;
