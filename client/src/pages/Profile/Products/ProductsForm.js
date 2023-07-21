import { Col, Form, Input, Modal, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlide";
import { AddProduct } from "../../../apicalls/products";
import { message } from "antd";

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({ showProductForm, setShowProductForm }) {
    const dispatch=useDispatch();
    const {user}= useSelector(state=>state.users)
    const onFinish=async (values)=>{
        try {
            values.seller=user._id;
            values.status="pending";    
            dispatch(SetLoader(true));
            const response=await AddProduct(values);
            dispatch(SetLoader(false));
            if(response.success){
                message.success(response.message);
                setShowProductForm(false);
            }
            else{
                message.error(response.message);
            }
        } catch(error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
    const formRef=useRef(null);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={()=>{
        formRef.current.submit();
      }}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input type="text"></Input>
            </Form.Item>
            <Form.Item label="Description" name="description" rules={rules}>
              <TextArea type="text" />
            </Form.Item>
            <Row gutter={[16, 16]}>
              {/* it has 24 columns */}
              <Col span={8}>
                <Form.Item label="Price" name="price" rules={rules}>
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Category" name="category" rules={rules}>
                  <select name="" id="">
                    <option value="metal">Metal</option>
                    <option value="alloy">Alloys</option>
                    <option value="appliance">Appliance</option>
                    <option value="can">Cans</option>
                    <option value="paper">Paper</option>
                  </select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Weight" name="weight" rules={rules}>
                  <Input type="number" placeholder="in Kg" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Images" key="2">
          <h1>Images</h1>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default ProductsForm;
