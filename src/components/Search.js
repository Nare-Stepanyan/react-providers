import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import PropTypes from "prop-types";

const sortOptions = [
  {
    label: "Reset",
    value: "",
  },
  {
    label: "A-Z",
    value: "a-z",
  },
  {
    label: "Z-A",
    value: "z-a",
  },
];

function Search(props) {
  const [sort, setSort] = useState({ label: "", value: "" });
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    const data = {};
    if (search) data.search = search;
    if (sort.value) data.sort = sort.value;

    props.getClients(data);
  };
  return (
    <div className="search">
      <Navbar expand="lg">
        <Navbar.Brand>
          <span style={{ color: "#17a2b8" }}>Sort and Filter:</span>
        </Navbar.Brand>
        <Navbar>
          <Nav>
            <NavDropdown title={sort.value ? sort.label : "Sort"}>
              {sortOptions.map((item, index) => {
                return (
                  <NavDropdown.Item
                    className="options"
                    key={index}
                    onClick={() => setSort(item)}
                    active={sort.value === item.value}>
                    {item.label}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar>
      </Navbar>
      <div className="sortNamv">
        <Form inline className="searchBtn">
          <FormControl
            className="formControl"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button
            className="formButton"
            variant="outline-info"
            onClick={handleSubmit}>
            Search
          </Button>
        </Form>
      </div>
    </div>
  );
}

Search.propTypes = {
  getClients: PropTypes.func.isRequired,
};
export default Search;
