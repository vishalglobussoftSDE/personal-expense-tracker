import React, { useState } from 'react';
import { Table, Select, Radio } from 'antd';
import Papa from "papaparse";
import searchImg from "../../assets/search.svg";
import "./style.css";
import { toast } from 'react-toastify';

const { Option } = Select;

const TransactionTable = ({ transactions, addTransaction, fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("date");

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Tag', dataIndex: 'tag', key: 'tag' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? transaction.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortKey === 'date') return new Date(b.date) - new Date(a.date);
    return b[sortKey] - a[sortKey];
  });

  const importFromCsv = (event) => {
    event.preventDefault();
    try {
      Papa.parse(event.target.files[0], {
        header: true,
        complete: async (results) => {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
          toast.success("All Transactions Added");
          fetchTransactions();
          event.target.value = null;
        },
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions,
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    console.log("Exported CSV file:", csv);
  };

  return (
    <>
      <div className="main">
        <div className="main-flex">
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>📋 Transactions</h2>
          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
        </div>

        <div className="input-flex">
          <img src={searchImg} alt="Search" style={{ width: 20, height: 20 }} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
          <Select
            className="select-input"
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter by type"
            allowClear
            style={{ width: 150 }}
          >
            <Option value="">All</Option>
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </div>

        <div className="input-flex">
          <button className="btn" onClick={exportCSV}>Export to CSV</button>
          <label htmlFor="file-csv" className="btn btn-blue">Import from CSV</label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            onChange={importFromCsv}
            style={{ display: "none" }}
          />
        </div>
      </div>

      <Table
        dataSource={sortedTransactions}
        columns={columns}
        rowKey={(record) => record.id || `${record.name}-${record.date}`}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default TransactionTable;
