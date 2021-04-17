const { users, createUser } = require("./user");
const { login } = require("./auth");
const { createEvent, events } = require("./event");
const { bookings, bookEvent, cancelBooking } = require("./booking");

module.exports = {
  users,
  events,
  createEvent,
  createUser,
  bookings,
  bookEvent,
  cancelBooking,
  login,
};
