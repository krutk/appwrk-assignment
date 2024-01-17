import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
const columns = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (text) => <a>{text}</a>,
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Credit',
        dataIndex: 'credit',
        key: 'credit',
    },
    {
        title: 'Debit',
        dataIndex: 'debit',
        key: 'debit',
    },
    {
        title: 'Running Balance',
        dataIndex: 'running_balance',
        key: 'running_balance',
    }
];



const TransactionTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/transactions').then(response => setData(response.data))
    }, []);
    return <Table columns={columns} dataSource={data} />
}

export default TransactionTable;