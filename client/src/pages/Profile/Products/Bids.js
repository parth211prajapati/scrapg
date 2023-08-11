import { Modal } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../../redux/loaderSlide';

function Bids({
    showBidsModal,
    setShowBidsModal,
    selectedProduct,
}) {
    const [bidsData,setBidsData]=useState([]);
    const dispatch=useDispatch();
    const getData=async()=>{
        try {
            dispatch(SetLoader(true));
            const response=await GetBids({
                product: selectedProduct._id,
            });
            dispatch(SetLoader(true));
            if(response.success){
                setBidsData(response.data);
            }
        } catch (error) {
            dispatch(SetLoader(false));
            message.error(error.message);
        }
    }
  return (
    <Modal
    title="Bids"
    open={showBidsModal}
    onCancel={()=>setShowBidsModal(false)}
    centered
    wifdth={800}
     >
        <h1>
            Product Name: {selectedProduct.name}
        </h1>
     </Modal>
  )
}

export default Bids