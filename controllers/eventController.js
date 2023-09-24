const { EventModel, EventRegistrationModel } = require("../Schemas");
const { z } = require("zod");

const EventDataSchema = z.object({
  pic: z.string().min(1).max(255),
  instructorID: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: "Invalid instructor ID format",
  }),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  from: z.number(),
  to: z.number(),
  date: z.string().min(1).max(255),
  typeID: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: "Invalid event type ID format",
  }),
  zoomLink: z.string().min(1).max(255),
});

const eventController = {};

eventController.createEvent = async (req, res) => {
  try {
      const requestData = {
        ...req.body,
      };
      EventDataSchema.parse(requestData);
      const event =  await EventModel.create(requestData);
      res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Event Validation Failed", message: error.message });
  }
};

eventController.updateEvent = async (req, res) => {
  try {
    const updatedData = req.body;
    const validData = EventDataSchema.parse(updatedData);
    const updatedEvent = await EventModel.findByIdAndUpdate(
      req.params.id,
      validData,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Event Validation Failed", message: error.message });
  }
};

eventController.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await EventModel.findByIdAndRemove(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

eventController.getAllEvents = async (req, res) => {
  try {
    const eventType = req.query.eventType;
    const query = eventType ? { typeID: eventType } : {};
    query.from = { $gt: Date.now() };
    let events = await EventModel.find(query)
      .populate("typeID").lean().exec();
    
    const registrationData = await Promise.all(events.map((event) => {
      return EventRegistrationModel.findOne({ eventID: event._id, userID: res.locals.user._id });
    }))

    

    const allRegisters = await Promise.all(events.map((event) => {
      return EventRegistrationModel.findOne({ eventID: event._id }).countDocuments();
    }))
    events = registrationData.map((reg, index) => {
      return { isBooked: reg || false, ...events[index],  studentsRegistered: allRegisters[index]};
    })
    res.status(200).json({
      isError: false,
      data: events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

eventController.getEventById = async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id)
      .populate("instructorID")
      .populate("typeID");
    res.status(200).json({
      ...event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

eventController.bookEvent = async (req, res) => {
  try {
    const userID = res.locals.user._id;
    const eventID = req.body.eventID;
    const registration = await EventRegistrationModel.create({
      userID,
      eventID,
    })
    res.status(200).json({
      isError: false,
      data: registration
    })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = eventController;
