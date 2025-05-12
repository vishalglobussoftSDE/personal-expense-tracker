import React from 'react'
import "./style.css"
import { Row, Card } from 'antd'
import Button from '../Button/Index'

const Cards = ({showExpenseModal , showIncomeModal , income , expenses , currentBalance}) => {
    return (
        <div>
            <Row className='my-row'>
                <Card variant="bordered" className='my-card'>
                    <h2>Current Balance</h2>
                    <p>{currentBalance}</p>
                    <Button text= "Reset Balance" blue = {true} />
                </Card>

                <Card variant="bordered"  className='my-card'>
                    <h2>Total Income</h2>
                    <p>{income}</p>
                    <Button text= "Add Income" blue = {true} onClick={showIncomeModal} />
                </Card>

                <Card variant= "bordered"  className='my-card'>
                    <h2>Total Expenses</h2>
                    <p>{expenses}</p>

                    <Button  text= "Add Expense" blue = {true} onClick={showExpenseModal}/>
                       
                    
                </Card>
            </Row>
        </div>
    )
}

export default Cards