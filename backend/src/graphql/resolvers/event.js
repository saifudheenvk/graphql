const Event = require("../../database/events/events.model");
const User = require("../../database/users/users.model");
const { isAuthenticated } = require("./auth");

exports.createEvent = async (args, req) => {
  try {
    isAuthenticated(req);
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    const savedEvent = await event.save();
    const user = await User.findById(req.userId);
    if (!user) throw new Error("No such user");
    else {
      user.createdEvents.push(event);
      await user.save();
    }
    return { ...savedEvent._doc };
  } catch (error) {
    throw error;
  }
};

exports.events = async (args, req) => {
  try {
    console.log(req);
    isAuthenticated(req);
    const events = await Event.find().populate({
      path: "creator",
      populate: { path: "createdEvents" },
    }); //populate createdevents iside creator
    return events.map((event) => {
      return { ...event._doc };
    });
  } catch (error) {
    throw error;
  }
};
