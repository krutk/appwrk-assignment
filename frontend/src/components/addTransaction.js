import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';

const AddTransaction = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/transactions').then((response) => {
            setTransactions(response.data);
        });
    }, []);

    const onFinish = (values) => {
        let running_balance = 0;

        transactions.forEach((transaction) => {
            const credit = transaction.credit || 0;
            const debit = transaction.debit || 0;
            transaction.running_balance = running_balance + credit - debit;
            running_balance = transaction.running_balance;
        });

        const { amount, description, transactionType } = values;
        const date = moment().format('YYYY-MM-DD');

        const data = {
            description: description,
            credit: transactionType === 'credit' ? amount : 0,
            debit: transactionType === 'debit' ? amount : 0,
            date: date,
            id: Math.floor(Date.now() + Math.random()),
            running_balance:
                transactionType === 'debit'
                    ? running_balance - amount
                    : transactionType === 'credit'
                        ? running_balance + amount
                        : 0,
        };

        axios
            .post('http://localhost:5000/transactions', data)
            .then((response) => {
                console.log('Transaction added successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error adding transaction:', error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Transaction Type"
                name="transactionType"
                rules={[{ required: true, message: 'Please input the transaction type!' }]}
            >
                <Select>
                    <Select.Option value="credit">Credit</Select.Option>
                    <Select.Option value="debit">Debit</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true, type: 'number', min: 0 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddTransaction;
