const internalErrorResponse = (error, res) => {
  return res.status(500).json(error.message);
};

module.exports = internalErrorResponse;
