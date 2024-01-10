const asyncHandler = require("express-async-handler");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send(`userId param not sent with the request`);
  }

  let isChat = Chat.find();
});
