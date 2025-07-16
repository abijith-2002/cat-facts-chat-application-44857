# Nord-Themed Cat Facts Chat App

A modern, minimalistic single-page chat app built with React. Every message you send is automatically answered with a random cat fact (sourced from [catfact.ninja](https://catfact.ninja/fact)). Styled with the Nord color palette, fully responsive, and uses the Inter Google Font for a clean, contemporary look.

## Features

- **Live chat interface**: Send as many messages as you like.
- **Auto-response**: Bot instantly replies with a fresh cat fact.
- **Beautiful Nord Theme**: Consistent color palette for dark, sleek UI.
- **Responsive & minimal**: Works intuitively on desktop & mobile.
- **Auto-scroll**: Always see the latest message.
- **Environment-aware**: Fetches API endpoint from `.env` if provided.
- **Inter Google Font**: For modern, easy-to-read text.

## Getting Started

1. **Install** dependencies:

   ```
   npm install
   ```

2. **(Optional)** Set custom cat fact API endpoint in `.env`:

   ```
   cp .env.example .env
   ```
   Then edit `.env` if needed.

3. **Run** the development server:

   ```
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Configuration

The app by default uses [https://catfact.ninja/fact](https://catfact.ninja/fact), but you can specify a different endpoint.

Just create a `.env` file in the project root with:

```
REACT_APP_CATFACT_API=https://catfact.ninja/fact
```

## Design Choices

- **Nord Palette**: See [`src/App.css`](src/App.css) for the theme variables.
- **Font**: Google [Inter](https://fonts.google.com/specimen/Inter).
- **No heavy dependencies**: Only React and basic packages.

## Folder Structure

- `src/App.js` - Full chat UI and logic
- `src/App.css` - Nord theme, layout, responsive styles
- `.env.example` - Example for API config

## License

Provided for demonstration and educational purposes.
