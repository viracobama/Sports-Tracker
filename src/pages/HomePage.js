import NavbarBS from '../components/Navbar.js';
import SportSelection from '../components/sportSelection.js';
import { GlobalStateContext } from '../components/GlobalState.js';
import React, { useState, useEffect, useContext } from 'react';
import './HomePage.css'; // Import the CSS file

// URLs for fetching news articles
const nflUrl = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/news?limit=50';
const nbaUrl = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=50';

function HomePage() {
    const { globalState, setGlobalState } = useContext(GlobalStateContext);
    const sport = globalState.sport;
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log('API Response:', result); // Debugging statement
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (sport === 'NFL') {
            fetchData(nflUrl);
        } else if (sport === 'NBA') {
            fetchData(nbaUrl);
        }
    }, [sport]);

    return (
        <div>
            <NavbarBS className="navbar" />
            <h2 className="page-title">Home Page</h2>
            <h3 className="info-title">
                {sport === 'NFL' && <>Displaying information about <strong>NFL</strong></>}
                {sport === 'NBA' && <>Displaying information about <strong>NBA</strong></>}
            </h3>
            <SportSelection />
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
                                            Read more
                                        </a>
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No articles found.</p>
                        )}
                    </div>
                ) : (
                    <p>Loading...</p>
                )
            ) : (
                <p>Select NFL or NBA to see news articles.</p>
            )}
        </div>
    );
}

export default HomePage;