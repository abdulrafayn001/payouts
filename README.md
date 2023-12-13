# Payouts

This project is a React application developed using TypeScript and styled with Styled Components. It allows users to interact with payouts data retrieved from an existing API.

## Technical Requirements

### General

- **Language:** TypeScript
- **Styling:** Styled Components
- **Design Adaptations:** Use best judgment to adjust designs as needed, particularly for adding a username column.
- **Search Functionality:** Implement search functionality for payouts based on various criteria, including username.
- **Pagination:** Implement pagination functionality for navigating through payouts.

### API Integration

#### Payouts Endpoint

- **Endpoint:** `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts`
- **Method:** GET
- **Fields in Payout Object:**
  - `dateAndTime`: Date and time of the payout
  - `status`: Status of the payout (Pending or Completed)
  - `value`: Value of the payout
  - `username`: Username associated with the payout
- **Metadata:**
  - `"metadata": {"page": number, "limit": number, "totalCount": number}`
- **Pagination Parameters:** Attach `page` and `limit` query parameters for pagination.

#### Search Endpoint

- **Endpoint:** `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/search?query=SEARCH_TERM`
- **Method:** GET
- **Description:** Allows searching payouts by username.

## Node Version

This project requires Node.js. The recommended version is Node.js v18.17.1.

## Deployment

This project is deployed on Vercel. You can access the live version [here](https://payouts-wul82qmxx-abdulrafayn001.vercel.app/).

## Environment Variables

To properly configure the application, create a `.env` file in the root directory of the project. Define the following variables:

### Environment Variables

- `VITE_BASE_URL`: This variable sets the base URL for the API endpoints.
- `VITE_ITEMS_PER_PAGE`: Determines the number of items displayed per pagination page.

Make sure to adjust these variables as needed for your environment or API requirements.

## Getting Started

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the project with `npm run dev`.
4. Access the application at `http://localhost:5173`.

## Usage

- Navigate through payouts using the provided search and pagination functionalities.
- Customize and adapt designs as necessary.
- Implement further features as needed.
