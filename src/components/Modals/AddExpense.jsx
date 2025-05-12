import React from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
} from "antd";
function AddExpenseModal({
    isExpenseModalVisible,
    handleExpenseCancel,
    onFinish,
}) {
    const [form] = Form.useForm();
    return (
        <Modal
            style={{ fontWeight: 600 }}
            title="Add Expense"
            open={isExpenseModalVisible}
            onCancel={handleExpenseCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    onFinish(values, "expense");
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
                        { required: true, message: "Please input the expense amount!" },
                    ]}
                >
                    <Input type="number" className="custom-input" />
                </Form.Item>
                <Form.Item
                    style={{ fontWeight: 600 }}
                    label="Date"
                    name="date"
                    rules={[
                        { required: true, message: "Please select the expense date!" },
                    ]}
                >
                    <DatePicker className="custom-input" format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    label="Tag"
                    name="tag"
                    style={{ fontWeight: 600 }}
                    rules={[{ required: true, message: "Please select a tag!" }]}
                >
                    <Select className="select-input-2">
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="office">Office</Select.Option>
                        <Select.Option value="transport">Transport</Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value="shopping">Shopping</Select.Option>
                        <Select.Option value="health">Health</Select.Option>
                        <Select.Option value="travel">Travel</Select.Option>
                        <Select.Option value="utilities">Utilities</Select.Option>
                        <Select.Option value="insurance">Insurance</Select.Option>
                        <Select.Option value="rent">Rent</Select.Option>
                        <Select.Option value="subscriptions">Subscriptions</Select.Option>
                        <Select.Option value="gym">Gym</Select.Option>
                        <Select.Option value="gift">Gift</Select.Option>
                        <Select.Option value="charity">Charity</Select.Option>
                        <Select.Option value="tax">Tax</Select.Option>
                        <Select.Option value="loan">Loan</Select.Option>
                        <Select.Option value="personal">Personal</Select.Option>
                        <Select.Option value="grocery">Grocery</Select.Option>
                        <Select.Option value="bank_fee">Bank Fee</Select.Option>
                        <Select.Option value="repair">Repair</Select.Option>
                        <Select.Option value="maintenance">Maintenance</Select.Option>
                        <Select.Option value="business">Business</Select.Option>
                        <Select.Option value="transportation">Transportation</Select.Option>
                        <Select.Option value="marketing">Marketing</Select.Option>
                        <Select.Option value="professional_services">Professional Services</Select.Option>
                        <Select.Option value="construction">Construction</Select.Option>
                        <Select.Option value="tech">Tech</Select.Option>
                        <Select.Option value="legal">Legal</Select.Option>
                        <Select.Option value="mortgage">Mortgage</Select.Option>
                        <Select.Option value="childcare">Childcare</Select.Option>
                        <Select.Option value="pet">Pet</Select.Option>
                        <Select.Option value="events">Events</Select.Option>
                        <Select.Option value="furniture">Furniture</Select.Option>
                        <Select.Option value="car">Car</Select.Option>
                        <Select.Option value="fuel">Fuel</Select.Option>
                        <Select.Option value="electricity">Electricity</Select.Option>
                        <Select.Option value="water">Water</Select.Option>
                        <Select.Option value="mobile">Mobile</Select.Option>
                        <Select.Option value="internet">Internet</Select.Option>
                        <Select.Option value="education_supplies">Education Supplies</Select.Option>
                        <Select.Option value="sports">Sports</Select.Option>
                        <Select.Option value="hobbies">Hobbies</Select.Option>
                        <Select.Option value="transportation_services">Transportation Services</Select.Option>
                    </Select>

                </Form.Item>
                <Form.Item>
                    <Button className="btn btn-blue" type="primary" htmlType="submit">
                        Add Expense
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddExpenseModal;