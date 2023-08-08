import { Col, Form, Input, Modal, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlide";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import { message } from "antd";
import Images from "./Images";

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({ showProductForm, setShowProductForm, selectedProduct, getData}) {
  const [selectedTab="1",setSelectedTab]=useState("1");
    const dispatch=useDispatch();
    const {user}= useSelector(state=>state.users)
    const onFinish=async (values)=>{
        try {
            dispatch(SetLoader(true));
            let response=null;
            if(selectedProduct){
              response=await EditProduct(selectedProduct._id,values);
            }
            else{
              values.seller=user._id;
              values.status="pending";
             response= await AddProduct(values);
            }
            dispatch(SetLoader(false));
            if(response.success){
                message.success(response.message);
                getData();
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

    useEffect(()=>{
      if(selectedProduct){
        formRef.current.setFieldsValue(selectedProduct);
      }
    },[selectedProduct]);


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
      {...(selectedTab==="2" && {footer:false})}
    >
      <div>
        <h1 className="text-2xl text-primary text-center font-semibold uppercase">
            {selectedProduct ? "Edit Item": "Add Item"}
          </h1> 
        <Tabs defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key)=>{setSelectedTab(key)}}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text"/>
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
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images selectedProduct={selectedProduct} getData={getData} setShowProductForm={setShowProductForm} />
          </Tabs.TabPane>
        </Tabs>
      </div> 
    </Modal>
  );
}

export default ProductsForm;
