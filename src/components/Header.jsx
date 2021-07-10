import React, { Component, forwardRef } from "react";
import { newsCategory } from "../news";

class Header extends Component {
  state = {
    searchTerm: "",
  };

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.props.search(this.state.searchTerm);
    }
  };

  render() {
    const { category, changeCategory, searchRef } = this.props;
    return (
      <div className="my-4">
        <h1 className="mb-4" style={{ fontWeight: "300" }}>
          News Headlines
        </h1>
        <input
          ref={searchRef}
          type="text"
          className="form-control"
          placeholder="Type Anything & Press Enter To Search"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <div className="my-4">
          {newsCategory &&
            Object.keys(newsCategory).map((item) => {
              let btnColor = "";
              if (category === newsCategory[item]) {
                btnColor = "warning";
              } else {
                btnColor = "light";
              }
              return (
                <button
                  onClick={() => changeCategory(newsCategory[item])}
                  key={item}
                  style={{ marginRight: "10px" }}
                  className={`btn btn-sm btn-${btnColor} mb-2`}
                >{`#${newsCategory[item]}`}</button>
              );
            })}
        </div>
      </div>
    );
  }
}

export default forwardRef((props, ref) => (
  <Header {...props} searchRef={ref} />
));
