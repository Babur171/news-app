# News Aggregator Challenge

Welcome to the **Frontend Web Developer Take-Home Challenge**! This project involves building a user interface for a news aggregator website. The app will fetch and display articles from multiple sources, allowing users to search, filter, and personalize their news feed. The final application should be mobile-responsive and follow best practices in software development.

## Data Sources

You must choose at least **Three** of the following APIs to fetch news articles:

- [NewsAPI](https://newsapi.org/)
- [The Guardian API](https://open-platform.theguardian.com/documentation/)
- [The NewYork API](https://api.nytimes.com/)

## Prerequisites

- **Node.js** (v18 or later)
- **Docker** (optional, for containerization)
- API keys for the selected data sources (sign up on the respective platforms to obtain these).

### Clone the Repository

- git clone https://github.com/Babur171/news-app.git
- cd news-app

## Set Up Environment Variables

- Change **.env.example** file into **.env** file in the root directory

## Docker Build and Running Docker Container

**Build Image and run Docker Container**

- `docker compose up`
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## OR Docker Setup and Running the Project

**Build the Docker Image**

- `docker build -t news-aggregator .`

- Run the Docker Container
  `docker run -p 3000:3000 news-aggregator`

## In the project directory, you can run:

### Install Dependencies

npm install or yarn install

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
