This project supports both local MongoDB and MongoDB Atlas.

For quick setup, MongoDB Atlas is recommended as it requires no local installation.

## Deployment Approach (AWS)

The backend is structured to be deployable using AWS Lambda and API Gateway.

Steps:
1. Convert Express app using serverless-http
2. Deploy using Serverless Framework
3. Configure API Gateway routes
4. Connect MongoDB Atlas as external database

Due to time constraints, the application is currently running locally, but can be easily deployed to AWS using the above approach.