import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

const Information = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(
        `http://localhost:500/api/products/info/${id}`
      );
      setInfo(data.productInformation);
      console.log(data.productInformation);
    };
    getInfo();
  }, []);
  return (
    <div>
      {info && (
        <Table responsive bordered striped hover className="table-sm">
          <tbody>
            <tr>
              <td>Brand</td>
              <td>{info.brand}</td>
            </tr>
            <tr>
              <td>Operating System</td>
              <td>{info.OperatingSystem}</td>
            </tr>
            <tr>
              <td>Basic Colors</td>
              <td>{info.basicColours}</td>
            </tr>

            <tr>
              <td>CPU Speed</td>
              <td>{info.cpuSpeed}</td>
            </tr>
            <tr>
              <td>CPU Type</td>
              <td>{info.cpuType}</td>
            </tr>

            <tr>
              <td>Graphics Proccesor</td>
              <td>{info.graphicsProcessor}</td>
            </tr>
            <tr>
              <td>Hard Drive Type</td>
              <td>{info.hardDriveTpye}</td>
            </tr>
            <tr>
              <td>Is MultiTouch</td>
              <td>{info.isMultiTouch ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Model</td>
              <td>{info.model}</td>
            </tr>
            <tr>
              <td>Number Of HDMI Ports</td>
              <td>{info.numberOfHdmiPorts}</td>
            </tr>
            <tr>
              <td>Number Of USB Ports</td>
              <td>{info.numberOfusbPorts}</td>
            </tr>
            <tr>
              <td>Ram Size</td>
              <td>{info.ramSize}</td>
            </tr>
            <tr>
              <td>Ram Type</td>
              <td>{info.ramType}</td>
            </tr>
            <tr>
              <td>Screen Size</td>
              <td>{info.screenSize}</td>
            </tr>
            <tr>
              <td>Screen Type</td>
              <td>{info.screenTypes}</td>
            </tr>
            <tr>
              <td>Storage Capacity</td>
              <td>{info.storageCapacity}</td>
            </tr>

            <tr>
              <td>Touch Screen Enabled</td>
              <td>{info.touchScreenEnabled ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td>{info.waranty}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Information;
