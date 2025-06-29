const responseHandler = {
  sendSuccess: (res, apiName, statusCode, data) => {
    return res.status(statusCode).json({
      success: true,
      api: apiName,
      data,
    });
  },

  sendError: (res, apiName, statusCode, errorMessage) => {
    console.error(`[ERROR] ${apiName}:`, errorMessage);
    return res.status(statusCode).json({
      success: false,
      api: apiName,
      error: errorMessage,
    });
  },
};

module.exports = responseHandler;
