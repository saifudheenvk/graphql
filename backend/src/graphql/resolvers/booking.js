const Booking = require("../../database/bookings/bookings.model");
const { isAuthenticated } = require("./auth");

exports.bookings = async (args, req) => {
  try {
    isAuthenticated(req);
    const bookings = await Booking.find().populate("user").populate("event");
    return bookings.map((booking) => {
      return { ...booking._doc };
    });
  } catch (error) {
    throw error;
  }
};

exports.bookEvent = async (args, req) => {
  try {
    isAuthenticated(req);
    const booking = new Booking({
      user: req.userId,
      event: args.eventId,
    });
    const savedBooking = await booking.save();
    const result = await Booking.findById(savedBooking._id)
      .populate("user")
      .populate("event");
    return { ...result._doc };
  } catch (error) {
    throw error;
  }
};

exports.cancelBooking = async (args, req) => {
  try {
    isAuthenticated(req);
    const booking = await Booking.findById(args.bookingId).populate({
      path: "event",
      populate: "creator",
    });
    if (!booking) throw new Error("No such booking");
    await Booking.deleteOne({ _id: args.bookingId });
    console.log(args.bookingId, booking);
    return booking.event._doc;
  } catch (error) {
    throw error;
  }
};
