import { Button,message,Table } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { GetProducts } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loaderSlide";
function Products() {
  const [products,setProducts]=useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch=useDispatch();

  const getData=async()=>{
    try {
      dispatch(SetLoader(true));
      const response=await GetProducts();
      dispatch(SetLoader(false));
      if(response.success){
        setProducts(response.products)
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text,record)=>{
        return(<div className="flex gap-5">
          <i className="ri-delete-bin-line"></i>
          <i className="ri-pencil-line"></i>
        </div>)
      }
    },
  ];
  useEffect(()=>{
    getData();
  },[]);
  return (
    <>
      <div className="flex justify-end mb-2">
        <Button type="default" onClick={() => setShowProductForm(true)}>
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products}/>
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </>
  );
}

export default Products;
