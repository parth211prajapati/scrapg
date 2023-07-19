import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import Divider from '../../components/Divider'

const rules=[{
  required: true,
  message: "required",
},]

const onFinish=(values)=>{
  console.log("Success:",values)
}


function Login() {
  
  return (
    <div className='bg-primary h-screen flex justify-center items-center'>
      <div className='bg-white p-5 rounded w-[450px]'>
        <h1 className='text-primary text-2xl'>SCRAPG - <span className='text-gray-400'>LOGIN</span></h1>
        <Divider/>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label='Email' name='email' rules={rules}>
            <Input placeholder='Email'/>
          </Form.Item>
          <Form.Item label='Password' name='password' rules={rules}>
            <Input type='password' placeholder='Password'/>
          </Form.Item>
          <Button className='mt-2' type='primary' htmlType='submit' block>
            Login
          </Button>
          <div className='mt-5 text-center'>
            <span className='text-gray-500'>
              Don't have an account? <Link to='/register' className='text-primary'>Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login