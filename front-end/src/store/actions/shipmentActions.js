import * as constants from "../actionContants/shipmentConstants";

export const addShipment = (shipment) => (dispatch, getState) => {
  dispatch({
    type: constants.ADD_SHIPMENT,
    payload: shipment,
  });

  localStorage.setItem(
    "shipment",
    JSON.stringify(getState().addShipMent.shipment)
  );
};
