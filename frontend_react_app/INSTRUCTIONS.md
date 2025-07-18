# Instructions: Nord-Themed Cat Facts Chat App

## Install & Run

1. **Install dependencies:**
   ```
   npm install
   ```
2. **(Optional) Configure API:**
   - Copy `.env.example` to `.env` and set `REACT_APP_CATFACT_API` to your preferred API endpoint.
3. **Start the app:**
   ```
   npm start
   ```
   - Visit [http://localhost:3000](http://localhost:3000).

## Features

- Modern, minimal UI with Nord color palette.
- User can send chat messages at the bottom.
- Bot automatically replies to each message with a random cat fact from API.
- Responsive for desktop & mobile.
- Inter Google Font for clean typography.
- `.env`-configurable API URL.

## Configuring API Endpoint

- By default uses: https://catfact.ninja/fact
- To override: set `REACT_APP_CATFACT_API` in a `.env` file in root:
  ```
  REACT_APP_CATFACT_API=https://catfact.ninja/fact
  ```

## Development Notes

- All UI and logic in `src/App.js` and styles in `src/App.css`.
- No heavy dependencies; all logic is handled with React's hooks and modern CSS.
