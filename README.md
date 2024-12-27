VeriNFT Backend

VeriNFT Backend is the core infrastructure for verifying the authenticity of NFTs, fetching their metadata, and supporting batch processing of multiple NFTs using the bitsCrunch API. This backend is designed to be secure, scalable, and easy to integrate with frontend applications.

Features

NFT Verification: Verify the authenticity of NFTs using bitsCrunch’s IP Protection APIs.

Metadata Fetching: Retrieve metadata for NFTs, including title, creator, and mint date.

Batch Processing: Process multiple NFTs using a CSV file.

User Management: Handle user authentication with JWT-based login and signup.

Error Handling: Descriptive error messages for better debugging.

Prerequisites

Ensure you have the following installed:

Node.js (v14 or later)

npm (v6 or later)

MongoDB Atlas (or a local MongoDB instance)

Installation

Clone the repository:

git clone https://github.com/your-repo/veriNFT-backend.git
cd veriNFT-backend

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory and add the following:

PORT=5000
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/veriNFT?retryWrites=true&w=majority
BITSCRUNCH_API_KEY=your_bitsCrunch_api_key
JWT_SECRET=your_jwt_secret

Scripts

Start in Production:

npm start

Start in Development:

npm run dev

Folder Structure

veriNFT-backend/
├── src/
│   ├── controllers/       # Logic for handling API requests
│   ├── routes/            # API routes
│   ├── middleware/        # Middleware (e.g., authentication)
│   ├── models/            # Mongoose schemas
│   ├── utils/             # Utility functions (e.g., bitsCrunch API integration)
│   ├── config/            # Configuration (e.g., database connection)
│   └── server.ts          # Entry point for the server
├── .env                   # Environment variables
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
├── README.md              # Project documentation

API Endpoints

Authentication

Register: POST /api/auth/signup

Body:

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:

{
  "message": "User registered successfully."
}

Login: POST /api/auth/login

Body:

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:

{
  "token": "jwt_token"
}

NFT Verification

Verify NFT: POST /api/nft/verify

Body:

{
  "contractAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "tokenId": "1"
}

Response:

{
  "authenticity": "Valid",
  "confidenceScore": 0.87,
  "relatedDuplicates": ["0xabc123", "0xdef456"]
}

Fetch Metadata: POST /api/nft/metadata

Body:

{
  "contractAddress": "0x1234567890abcdef1234567890abcdef12345678",
  "tokenId": "1"
}

Response:

{
  "title": "Digital Art #1",
  "creator": "Artist Name",
  "collectionName": "Artworks",
  "owner": "0x789123",
  "mintDate": "2024-01-15"
}

Batch Verify NFTs: POST /api/nft/batch-verify

Body: CSV file containing contractAddress and tokenId columns.

Response:

{
  "results": [
    {
      "contractAddress": "0x123...",
      "tokenId": "1",
      "authenticity": "Valid",
      "confidenceScore": 0.87
    }
  ]
}

Development

Run the server in development mode:

npm run dev

Access the server:

Local: http://localhost:5000

Test endpoints using tools like Postman or Curl.

Contributing

Fork the repository.

Create a feature branch:

git checkout -b feature-name

Commit your changes:

git commit -m "Description of changes"

Push to your branch:

git push origin feature-name

Create a pull request.

License

This project is licensed under the MIT License.

Acknowledgments

bitsCrunch for their API services.

MongoDB Atlas for database hosting.

Community contributions for improving the project.

