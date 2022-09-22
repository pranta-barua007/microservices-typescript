//this implementation is not used, rather we're connecting to real stripe service and testing it
export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}), //mock resoleve returns a promise which will aleays resolve
  },
};
