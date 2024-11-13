// Code to display the home page of the app
// This page will display the news articles for the selected sport
// This is the default page after logging in

import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import React, { useState, useEffect, useContext } from 'react';
import FavTeamsFilter from '../components/FavTeamsFilter.js';
import FavTeamsReplacement from '../components/FavTeamsReplacement.js';
import '../styles/threeContainers.css';
import '../styles/HomePage.css';
import '../i18n.js'; // for language change
import { useTranslation } from 'react-i18next'; // Import useTranslation for language switching

function HomePage() {
    const { t, i18n } = useTranslation(); // Access the translation function
    const { globalState, isLoggedIn } = useContext(GlobalStateContext);
    const sport = globalState.sport;
    const [data, setData] = useState(null);

    // Determine the API URL dynamically based on the sport and language
    const getApiUrl = (sport, lang) => {
        if (sport === 'NFL') {
            return `https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=50&lang=${lang}`;
        } else if (sport === 'NBA') {
            return `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=50&lang=${lang}`;
        }
        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            const lang = i18n.language; // Get the current language (en or es)
            const url = getApiUrl(sport, lang);
            if (!url) return;

            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log('API Response:', result); // Debugging statement
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sport, i18n.language]); // Re-fetch data whenever the sport or language changes

    return (
        <div>
            <NavbarBS />
            {/* A div holding page's entire content */}
            <div className="main-content">
                {/* left content - formatting the sport selection to left */}
                <div className="left-content">
                    <SportSelection />
                </div>
                {/* Page specific content - main content */}
                <div className="middle-content">
                    <br /><br /><br /><br />
                    <h1>{t("news_articles")}</h1>
                    {(sport === 'NFL' || sport === 'NBA') ? (
                        data ? (
                            <div className="scrollable-container">
                                {Array.isArray(data.articles) ? (
                                    data.articles.map((article, index) => (
                                        <div key={index} className="article">
                                            {article.images && article.images.length > 0 && (
                                                <a href={article.links.web.href} target="_blank" rel="noopener noreferrer">
                                                    <img className="article-image" src={article.images[0].url} alt={article.headline} />
                                                </a>
                                            )}
                                            <h2 className="article-headline">{article.headline}</h2>
                                            <p className="article-description">
                                                {article.description}{' '}
                                                <a href={article.links.web.href} target="_blank" rel="noopener noreferrer" className="read-more">
                                                    {t("read_more")}
                                                </a>
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>{t("no_articles_found")}</p>
                                )}
                            </div>
                        ) : (
                            <p>{t("loading")}</p>
                        )
                    ) : (
                        <p>{t("select_sport_prompt")}</p>
                    )}
                </div>
                {/* right content - formatting the favorite teams to the right */}
                <div className="right-content">
                    {isLoggedIn.bool ? (
                        <FavTeamsFilter />
                    ) : (
                        <FavTeamsReplacement />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
