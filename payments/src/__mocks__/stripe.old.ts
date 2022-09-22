export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}), //mock resoleve returns a promise which will aleays resolve
  },
};
