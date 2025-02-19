### Moviepedia 🎥

Welcome to **Moviepedia**! A movie discovery app built with React and Tailwind CSS, powered by the OMDb API. With Moviepedia, you can search for your favorite movies or explore random selections to find new favorites. Whether you're a movie enthusiast or just looking for something new to watch, Moviepedia has something for everyone.

## Features

- 🔍 **Movie Search**: Easily search for movies by title.
- 🎲 **Random Movie Discovery**: Get random movie suggestions to explore new films.
- 🎬 **Detailed Movie Information**: View detailed information such as plot, cast, year of release, and more.
- 📱 **Responsive Design**: Optimized for both desktop and mobile using Tailwind CSS.

## Tech Stack

- **React**: Front-end framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **OMDb API**: API for accessing movie data.
- **Axios**: For making API calls to OMDb.

## Installation and Setup

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/dasakash26/Moviepedia
cd Moviepedia
```

### 2. Install dependencies

Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

```bash
npm install
```

### 3. Set up OMDb API key

Create a `.env` file in the root directory and add your OMDb API key:

```bash
REACT_APP_API_URL=http://www.omdbapi.com/
REACT_APP_API_KEY=your_api_key_here
```

### 4. Run the app

```bash
npm start
```

### Troubleshooting

- If you encounter any issues during installation, ensure all dependencies are properly installed and the API key is correctly set up in the `.env` file.
- For additional help, refer to the [Node.js](https://nodejs.org/en/docs/) and [React](https://reactjs.org/docs/getting-started.html) documentation.

## Usage

- **Search**: Type in the title of a movie, series, or episode to search the OMDb API for information.
- **Random Movies**: On the homepage, random movies are displayed to help you discover new films.

## Screenshots

### Home Page
![Home Page](https://i.postimg.cc/jdBvrLnL/Screenshot-2024-10-13-144145.png)

### Search Results
![Search Results](https://i.postimg.cc/bvCkPwmZ/image.png)

## API Reference

Moviepedia uses the [OMDb API](http://www.omdbapi.com/) for all movie data. You’ll need to sign up for an API key to make requests.

- **By Search**: `/s={title}&apikey=YOUR_API_KEY`
- **By Title**: `/t={title}&apikey=YOUR_API_KEY`
- **By ID**: `/i={imdb_id}&apikey=YOUR_API_KEY`

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly encouraged.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy movie hunting with Moviepedia! 🍿**
