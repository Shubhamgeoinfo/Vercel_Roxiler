import "./App.css";
import { useState, useEffect } from "react";
import Front from "./components/Front";
import { Search } from "./components/search/search";
import { Select } from "./components/select/select";
import { Table } from "./components/table/table";
import axios from "axios";
import Pagination from "./components/pagination/pagination";
import { CardBox } from "./components/card/card";
import BarChart from "./components/graph/graph";
import PieChart from "./components/graph/pieChart";
const apiDomain = "https://vercel-roxiler-api-git-main-shubham-kumars-projects-a277b10a.vercel.app"

function App() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(2);
  const [tableData, setTableData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [count, setCount] = useState(5);
  const [totalRecordCount, setTotalRecordCount] = useState(0);

  const handleSearch = (value) => {
    setSearch(value);
    setPageNo(0);
  };
  const handleMonthChange = (value) => {
    setMonth(value);
    setPageNo(0);
  };
  const handlePageChange = (value) => {
    if (value >= 0 && value < Math.floor(totalRecordCount / count)) {
      setPageNo(value);
    }
  };
  useEffect(() => {
    axios.get(`${apiDomain}/month/${month}?search=${search}&page=${pageNo}`).then((res) => {
      setTableData(res.data.data);
      setTotalRecordCount(
        res.data.totalCount.length ? res.data.totalCount[0].count : 0
      );
    });
    axios.get(`${apiDomain}/all/${month}`).then((res) => {
      setStatsData(res.data.statsData);
      setBarData(res.data.barData);
      setPieData(res.data.pieData);
    });
  }, [month, search, pageNo]);
  return (
    <div className="App">
      <Front />
      <div className="menu">
        <Search handleSearch={handleSearch} />
        <Select value={month} handleChange={handleMonthChange} />
      </div>
      <div className="table-data">
        <Table data={tableData} />
      </div>
      <Pagination
        className="pagination"
        pageNo={pageNo}
        count={count}
        handlePageChange={handlePageChange}
      />
      <div className="stats-container">
        <CardBox
          className="card-container"
          statsData={statsData}
          month={month}
        />
        <PieChart pieData={pieData} month={month} />
      </div>

      <BarChart className="bar-graph" barData={barData} month={month} />
    </div>
  );
}

export default App;
