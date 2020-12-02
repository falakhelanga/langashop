import * as constants from "../actionContants/shipmentConstants";

export const addShipMent = (
  state = {
    shipment: {},
  },
  action
) => {
  switch (action.type) {
    case constants.ADD_SHIPMENT:
      return {
        shipment: action.payload,
      };

    case constants.RESET_SHIPMENT:
      return {
        shipment: {},
      };
    default:
      return state;
  }
};
