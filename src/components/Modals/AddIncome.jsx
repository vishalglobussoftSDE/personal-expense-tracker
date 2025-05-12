import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Income"
      open={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income");
          form.resetFields();
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            <Select.Option value="business">Business</Select.Option>
            <Select.Option value="rental_income">Rental Income</Select.Option>
            <Select.Option value="dividends">Dividends</Select.Option>
            <Select.Option value="interest">Interest</Select.Option>
            <Select.Option value="pension">Pension</Select.Option>
            <Select.Option value="commission">Commission</Select.Option>
            <Select.Option value="royalties">Royalties</Select.Option>
            <Select.Option value="bonuses">Bonuses</Select.Option>
            <Select.Option value="side_hustle">Side Hustle</Select.Option>
            <Select.Option value="stock_sale">Stock Sale</Select.Option>
            <Select.Option value="gift">Gift</Select.Option>
            <Select.Option value="cashback">Cashback</Select.Option>
            <Select.Option value="loans_received">Loans Received</Select.Option>
            <Select.Option value="crowdfunding">Crowdfunding</Select.Option>
            <Select.Option value="government_grants">Government Grants</Select.Option>
            <Select.Option value="inheritance">Inheritance</Select.Option>
            <Select.Option value="online_sales">Online Sales</Select.Option>
            <Select.Option value="app_sales">App Sales</Select.Option>
            <Select.Option value="affiliate_income">Affiliate Income</Select.Option>
            <Select.Option value="rental_profit">Rental Profit</Select.Option>
            <Select.Option value="peer_to_peer_lending">Peer to Peer Lending</Select.Option>
            <Select.Option value="consulting">Consulting</Select.Option>
            <Select.Option value="teaching">Teaching</Select.Option>
            <Select.Option value="blogging">Blogging</Select.Option>
            <Select.Option value="vlogging">Vlogging</Select.Option>
            <Select.Option value="youtube_ad_revenue">YouTube Ad Revenue</Select.Option>
            <Select.Option value="patreon">Patreon</Select.Option>
            <Select.Option value="sponsorship">Sponsorship</Select.Option>
            <Select.Option value="royalty_payments">Royalty Payments</Select.Option>
            <Select.Option value="startup">Startup</Select.Option>
            <Select.Option value="sales">Sales</Select.Option>
            <Select.Option value="workshop">Workshop</Select.Option>
            <Select.Option value="seminars">Seminars</Select.Option>
            <Select.Option value="ecommerce">E-commerce</Select.Option>
            <Select.Option value="digital_products">Digital Products</Select.Option>
          </Select>

        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;