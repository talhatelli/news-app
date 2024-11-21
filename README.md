# News App

## Project Description
**News App** is a modern web application built with **Next.js** that delivers the latest news articles dynamically. The app includes key features like state management with **Redux Toolkit**, fetching data from external APIs, and visually appealing charts for analytics. It is designed to be responsive and provides an interactive user experience.


## Features
![image](https://github.com/user-attachments/assets/de5e7481-b6a2-42e1-9183-4ffcd3b22f7d)
![image](https://github.com/user-attachments/assets/647a0a35-9328-40b7-a877-23996f139342)
![image](https://github.com/user-attachments/assets/1810b273-7560-4bc7-9d54-4a6caae74e3f)

- **Next.js with SSR:** Server-side rendering for faster page loads and better SEO.
- **Dynamic News Fetching:** Fetches news articles from external APIs based on user preferences such as categories, search queries, and countries.
- **State Management with Redux Toolkit:** Efficient and scalable state management for the application.
- **Chart.js Analytics:** Displays news trends and statistics with interactive charts.
- **Responsive UI:** Optimized design for seamless usage across devices.


## Screenshots

### News Page:
<img width="1440" alt="Screenshot 2024-11-22 at 02 37 43" src="https://github.com/user-attachments/assets/cb840721-36c6-48a7-aa05-62a1c9ba424d"><img width="1440" alt="Screenshot 2024-11-22 at 02 39 13" src="https://github.com/user-attachments/assets/2f1283fd-2e95-4a18-8fc4-065a83123b2e">

### Graph:
<img width="1440" alt="Screenshot 2024-11-22 at 02 37 59" src="https://github.com/user-attachments/assets/7cca6fa9-c760-49d0-932d-5076a75105a4"><img width="1440" alt="Screenshot 2024-11-22 at 02 38 08" src="https://github.com/user-attachments/assets/ed01681f-7036-4e7b-aa23-456dfdde8a4d">


## API Endpoints

### News Articles Endpoint
**URL:** `/api/news`

**Method:** `GET`

**Description:** Fetches a list of the latest news articles based on user preferences. Users can filter the news by categories, search keywords, and countries.

**Authentication Required:** No

**Query Parameters:**
- `category`: (optional) The category of the news (e.g., 'technology', 'business').
- `search`: (optional) A search term to filter news articles.
- `country`: (optional) The country code (e.g., 'us' for the United States).

### Countries Endpoint
**URL:** `/api/countries`

**Method:** `GET`

**Description:** Fetches a list of countries using the **Rest Countries API** to enable users to filter news by country.

**Authentication Required:** No

**Example API Call:**
bash `` https://restcountries.com/v3.1/all``

## Clone the Project

To clone the repository, run:

 ``git clone https://github.com/your-username/news-app.git``

cd news-app

