import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBids, GetProductsById } from "../../apicalls/products";
import { Button, message } from "antd";
import { SetLoader } from "../../redux/loaderSlide";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/Divider";
import moment from "moment";
import BidModal from "./BidModal";
function ProductInfo() {
  const {user}=useSelector((state)=>state.users);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAddNewBid,setShowAddNewBid]=useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductsById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse= await GetAllBids({product: id});
        setProduct({
          ...response.data,bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* images */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt=""
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer" +
                      (selectedImageIndex === index
                        ? "border-2 border-gray-700 border-solid p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                  />
                );
              })}
            </div>
            <Divider />
          <div>
            <h1 className="text-gray-600">Added On</h1>
            <span className="text-gray-600">
              {moment(product.createdAt).format("MMM D, YYYYY hh:mm A")}
            </span>
          </div>
          </div>
          

          {/* details */}
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font font-semibold text-orange-900">
                Item Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>₹{product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Weight</span>
                <span>{product.weight} Kg</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>
            <Divider/>
            <div className="flex flex-col">
              <div className="flex justify-between">
              <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
              <Button
              onClick={()=>setShowAddNewBid(!showAddNewBid)}
              disabled={user._id===product.seller._id}
              >Place Bid</Button>
              </div>
            </div>
          </div>
        </div>
        {showAddNewBid && <BidModal 
        product={product}
        reloadData={getData}
        showBidModal={showAddNewBid}
        setShowBidModal={setShowAddNewBid}
        />}
      </div>
    )
  );
}

export default ProductInfo;
