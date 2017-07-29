import axios from "axios";

export const FETCH_ARTICLES = "fetch_articles";
export const FETCH_ARTICLE = "fetch_article";

const ROOT_URL = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey="
const API_KEY = "8e6e4f3a4e624f66bde8ad3bac51c206"


export function fetchArticles() {
    const request = axios.get(`${ROOT_URL}${API_KEY}`);

    return {
        type: FETCH_ARTICLES,
        payload: request
    }
}

export function fetchArticle(url) {
    const request = axios.get(url,{
      headers: { "X-Mashape-Key": "MY_API_KEY",
    "Access-Control-Allow-Origin": "*" }
    });

    return {
        type: FETCH_ARTICLE,
        payload: request
    }
}

