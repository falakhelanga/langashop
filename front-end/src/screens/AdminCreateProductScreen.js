import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import axios from "axios";
import * as actions from "../store/actions/adminActions/products";
import * as constants from "../store/actionContants/adminContants/productsConstants";
const AdminCreateProductScreen = ({ history }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDiscount, setProductDiscount] = useState(0);
  const [productImage2, setProductImage2] = useState([]);
  const [productDescription, setProductDescription] = useState([]);
  const [productWarrant, setProductWarrant] = useState(0);
  const [productBasicColor, setProductBasicColor] = useState("");
  const [productScreenType, setProductScreenType] = useState("");
  const [productTouchEnabled, setProductTouchEnabled] = useState(false);
  const [productMultiTouch, setProductMultiTouch] = useState(false);
  const [productProccesspr, setProductProccessor] = useState("");
  const [productCpuSpeed, setProductCpuSpeed] = useState("");
  const [productOperating, setProductOperating] = useState("");
  const [productStorageCapacity, setProductStorageCapacity] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productScreenSize, setProductScreenSize] = useState("");
  const [productHdmiPorts, setProductHdmiPorts] = useState(0);
  const [productHardDriveType, setProductHardDriveType] = useState(0);
  const [productRamSize, setProductRamSize] = useState(0);
  const [productCpuType, setProductCpuType] = useState("");
  const [productModel, setProductModel] = useState("");
  const [productusbPorts, setProductusbPorts] = useState(0);
  const [productRamType, setProductRamType] = useState("");
  const [productNumStock, setProductNumStock] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const [err, setErr] = useState(null);

  const [uploading2, setUploading2] = useState(false);
  const [uploaded2, setUploaded2] = useState(false);

  const [err2, setErr2] = useState(null);

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.createAdminProducts);
  const { loading, error, created } = productState;
  const uploadImage = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };
      const { data } = await axios.post(
        "http://localhost:500/api/upload/",
        formData,
        config
      );

      setProductImage(data);
      setUploading(false);
      setUploaded(true);

      console.log(data);
    } catch (error) {
      setUploading(false);
      const erro = error.response.data.message
        ? error.response.data.message
        : error.response;
      setErr(erro);
    }
  };

  const uploadImages = async (e) => {
    setUploading2(true);
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("images", file);

    try {
      const config = {
        "Content-Type": "multipart/form-data",
      };
      const { data } = await axios.post(
        "http://localhost:500/api/upload/images",
        formData,
        config
      );

      setProductImage2([...productImage2, data]);
      setUploading2(false);
      setUploaded2(true);

      console.log(productImage2);
    } catch (error) {
      setUploading2(false);
      const erro = error.response.data.message
        ? error.response.data.message
        : error.response;
      setErr2(erro);
    }
  };
  useEffect(() => {
    let timeout;
    const upload = () => {
      if (uploaded) {
        timeout = setTimeout(() => {
          setUploaded(false);
        }, 10000);
      }
    };

    upload();
    return () => {
      clearTimeout(timeout);
    };
  }, [uploaded]);

  useEffect(() => {
    let timeout;
    const upload = () => {
      if (uploaded2) {
        timeout = setTimeout(() => {
          setUploaded2(false);
        }, 10000);
      }
    };

    upload();
    return () => {
      clearTimeout(timeout);
    };
  }, [uploaded2]);

  const product = {
    price: productPrice,
    productName: productName,
    image: productImage,
    detailsImage: productImage2,
    description: productDescription,
    waranty: productWarrant,
    basicColours: productBasicColor,
    screenTypes: productScreenType,
    touchScreenEnabled: productTouchEnabled,
    isMultiTouch: productMultiTouch,
    graphicsProcessor: productProccesspr,
    cpuSpeed: productCpuSpeed,
    OperatingSystem: productOperating,
    storageCapacity: productStorageCapacity,
    brand: productBrand,
    screenSize: productScreenSize,
    numberOfHdmiPorts: productHdmiPorts,
    hardDriveTpye: productHardDriveType,
    ramSize: productRamSize,
    ramType: productRamType,
    cpuType: productCpuType,

    model: productModel,
    numberOfusbPorts: productusbPorts,
    numStock: productNumStock,
    productDiscount: productDiscount,
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(actions.createProduct(product));
  };

  useEffect(() => {
    if (created) {
      dispatch({
        type: constants.CREATE_PRODUCTS_RESET,
      });
      history.goBack();
    }
  }, [history, dispatch, created]);
  return (
    <Container className=" mx-auto bg-white borderd rounded p-5">
      <h4>Create Product</h4>
      {loading && <Spinner />}
      {error && <Message>{error}</Message>}
      <Form onSubmit={createProductHandler}>
        <Form.Group controlledid="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            type="text"
            placeholder="Enter Product Name"
          />
        </Form.Group>
        <Form.Group controlledid="productPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            value={productPrice}
            onChange={(e) => {
              setProductPrice(e.target.value);
            }}
            type="number"
            placeholder="Enter Product Price"
          />
        </Form.Group>
        {uploading && <Spinner />}
        {uploaded && <Message variant="success">Image Uploaded</Message>}
        <Form.Group controlledid="productImage">
          <Form.Label>Product Image</Form.Label>
          <Form.File
            id="image-file"
            label="Choose File"
            onChange={uploadImage}
          ></Form.File>
        </Form.Group>
        {uploading2 && <Spinner />}
        {uploaded2 && <Message variant="success">Image Uploaded</Message>}
        <Form.Group controlledid="productImages">
          <Form.Label>Product Detail Images</Form.Label>
          <Form.File label="Choose File" onChange={uploadImages} multiple />
        </Form.Group>
        <Form.Group controlId="productdescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlledid="Warrant">
          <Form.Label>Product Warrant</Form.Label>
          <Form.Control
            value={productWarrant}
            onChange={(e) => {
              setProductWarrant(e.target.value);
            }}
            type="number"
            placeholder="Enter Product Name"
          />
        </Form.Group>
        <Form.Group controlId="basiccolor.ControlSelect1">
          <Form.Label>Product Basic Color</Form.Label>
          <Form.Control
            as="select"
            value={productBasicColor}
            onChange={(e) => {
              setProductBasicColor(e.target.value);
            }}
          >
            <option>Select Color</option>
            <option>Black</option>
            <option>Silver</option>
            <option>Red</option>
            <option>Silver</option>
            <option>White</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="screentype.ControlSelect1">
          <Form.Label>Product Screen Type</Form.Label>
          <Form.Control
            as="select"
            value={productScreenType}
            onChange={(e) => {
              setProductScreenType(e.target.value);
            }}
          >
            <option>Select Screen Type</option>
            <option>LED</option>
            <option>Transmissive</option>
            <option>Reflective</option>
            <option>Transflective</option>
            <option>WideScreen</option>
          </Form.Control>
        </Form.Group>
        <p>Is Touch Screen Enabled</p>
        <Row>
          <Col>
            <Form.Group controlId="touchscreen">
              <Form.Check
                type="checkbox"
                label="Yes"
                value={productTouchEnabled}
                onChange={(e) => {
                  setProductTouchEnabled(true);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="No"
                value={productTouchEnabled}
                onChange={(e) => {
                  setProductTouchEnabled(false);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <p>Is MultiTouch</p>
        <Row>
          <Col>
            <Form.Group controlId="multiTouch">
              <Form.Check
                type="checkbox"
                label="Yes"
                value={productMultiTouch}
                onChange={(e) => {
                  setProductMultiTouch(true);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="No"
                value={productMultiTouch}
                onChange={(e) => {
                  setProductMultiTouch(false);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="processor">
          <Form.Label>Product Graphic Proccessor</Form.Label>
          <Form.Control
            as="select"
            value={productProccesspr}
            onChange={(e) => {
              setProductProccessor(e.target.value);
            }}
          >
            <option>Select Graphic Processor</option>
            <option>GeForce GTX 1080</option>
            <option>GeForce GTX 1080 Ti</option>
            <option>GTX 1660 Ti</option>
            <option>RTX 2060 SUPER</option>
            <option>RTX 2070</option>
            <option>RTX 2070 SUPER</option>
            <option>RTX 2080</option>
            <option>RTX 2080 SUPER</option>
            <option>RTX 2080 Ti</option>
            <option>RTX 3070</option>
            <option>RTX 3080</option>
            <option>RTX 3090</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="processorspeed">
          <Form.Label>Product CPU Speed</Form.Label>
          <Form.Control
            as="select"
            value={productCpuSpeed}
            onChange={(e) => {
              setProductCpuSpeed(e.target.value);
            }}
          >
            <option>Select Cpu Speed</option>
            <option>3.9 GHz</option>
            <option>3.5 GHz</option>
            <option>2.5 GHz</option>
            <option>4.9 GHz</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="operating">
          <Form.Label>Product Operating System</Form.Label>
          <Form.Control
            as="select"
            value={productOperating}
            onChange={(e) => {
              setProductOperating(e.target.value);
            }}
          >
            <option>Select Operating System</option>
            <option>Windows</option>
            <option>Mac</option>
            <option>Linux</option>
            <option>Ubuntu</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="storage">
          <Form.Label>Product Storage Capacity</Form.Label>
          <Form.Control
            as="select"
            value={productStorageCapacity}
            onChange={(e) => {
              setProductStorageCapacity(e.target.value);
            }}
          >
            <option>Select Storage Capacity</option>
            <option>500 GB</option>
            <option>1 TB</option>
            <option>2 TB</option>
            <option>4 TB</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="operating">
          <Form.Label>Product Brand</Form.Label>
          <Form.Control
            as="select"
            value={productBrand}
            onChange={(e) => {
              setProductBrand(e.target.value);
            }}
          >
            <option>Select Product Brand</option>
            <option>Lenovo</option>
            <option>Sumsung</option>
            <option>HP</option>
            <option>Apple</option>
            <option>Acer</option>
            <option>Asus</option>
            <option>Dell</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="operating">
          <Form.Label>Product Screen Size</Form.Label>
          <Form.Control
            as="select"
            value={productScreenSize}
            onChange={(e) => {
              setProductScreenSize(e.target.value);
            }}
          >
            <option>Select Screen Size</option>
            <option>10.1 in</option>
            <option>15.6 in</option>
            <option>14 in</option>
            <option>13.3 in</option>
            <option>11.6 in</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlledid="hdmi">
          <Form.Label>Numver Of HDMI Ports</Form.Label>
          <Form.Control
            value={productHdmiPorts}
            onChange={(e) => {
              setProductHdmiPorts(e.target.value);
            }}
            type="number"
            placeholder="Enter Number Of HDMI ports"
          />
        </Form.Group>
        <Form.Group controlId="harddrive">
          <Form.Label>Product Hard Drive Type</Form.Label>
          <Form.Control
            as="select"
            value={productHardDriveType}
            onChange={(e) => {
              setProductHardDriveType(e.target.value);
            }}
          >
            <option>Select Hard Drive Type</option>
            <option>HHD</option>
            <option>SSD</option>
            <option>SATA</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlledid="hdmi">
          <Form.Label>Product Ram Size</Form.Label>
          <Form.Control
            value={productRamSize}
            onChange={(e) => {
              setProductRamSize(e.target.value);
            }}
            type="number"
            placeholder="Enter Ram Size"
          />
        </Form.Group>
        <Form.Group controlId="harddrive">
          <Form.Label>Product Ram Type</Form.Label>
          <Form.Control
            as="select"
            value={productRamType}
            onChange={(e) => {
              setProductRamType(e.target.value);
            }}
          >
            <option>Select Ram Type</option>
            <option>DDR SDRAM</option>
            <option>DDR2 SDRAM</option>
            <option>DDR3 SDRAM</option>
            <option>DDR4 SDRAM*</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="harddrive">
          <Form.Label>Product CPU Type</Form.Label>
          <Form.Control
            as="select"
            value={productCpuType}
            onChange={(e) => {
              setProductCpuType(e.target.value);
            }}
          >
            <option>Select CPU Type</option>
            <option>intel Core i7</option>
            <option>intel Core i5</option>
            <option>intel Core i3</option>
            <option>AMD E2</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlledid="productModel">
          <Form.Label>Product Model</Form.Label>
          <Form.Control
            value={productModel}
            onChange={(e) => {
              setProductModel(e.target.value);
            }}
            type="text"
            placeholder="Enter Product Model"
          />
        </Form.Group>
        <Form.Group controlledid="usb port">
          <Form.Label>Number Of Usb Ports</Form.Label>
          <Form.Control
            value={productusbPorts}
            onChange={(e) => {
              setProductusbPorts(e.target.value);
            }}
            type="number"
            placeholder="Enter USB ports"
          />
        </Form.Group>
        <Form.Group controlledid="numstock">
          <Form.Label>Number Of Stock</Form.Label>
          <Form.Control
            value={productNumStock}
            onChange={(e) => {
              setProductNumStock(e.target.value);
            }}
            type="number"
            placeholder="Enter Number Of Stock"
          />
        </Form.Group>

        <Form.Group controlledid="discount">
          <Form.Label>Product Discount</Form.Label>
          <Form.Control
            value={productDiscount}
            onChange={(e) => {
              setProductDiscount(e.target.value);
            }}
            type="number"
            placeholder="Enter Number product Discount"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default AdminCreateProductScreen;
