export default function ApiResponse(res, data, status = 200) {
  return res.status(status).json({
    API_VERSION: "1.0",
    responseData: data,
  });
}
