// i18n.js - The file to hold the translation files for the SPORTS-TRACKER application.
// Referenced this video "https://www.youtube.com/watch?v=dltHi9GWMIo&t=567s" for setting up i18n
// Referenced this documentation "https://react.i18next.com/guides/quick-start" 
// And here "https://www.npmjs.com/package/i18next-browser-languagedetector"
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Detects the user's language
  .use(initReactI18next)  // Initializes with React
  .init({
    resources: {
      en: {
        translation: {
          greeting_1: "Create Your ",
          greeting_2: "Perfect Experience!",
          favorite_teams: "Your Favorite Teams:",
          find_team: "Find a sports team to add to favorites:",
          switch_language: "Switch to Spanish",
          full_name: "Full Name",
          email: "Email",
          member_since: "Been a loyal member since",
          sign_out: "Sign Out",
          filter_teams: "Filter By Your Favorite Teams:",
          scores_title: "Teams - Latest Scores",
          stats_nav: "Stats",
          scores_nav: "Scores",
          schedule_nav: "Schedule",
          news_nav: "News",
          add_remove: "Add or remove teams on your account page!",
          displaying_info_nba: "Displaying information about ",
          no_game_data: "No recent game data available",
          choose_sport: "Choose Your Sport:",
          scores_date: "Date: ",
          last_game: "Last Game:",
          news_articles: "Sports News Articles",
          no_articles_found: "No articles found",
          loading: "Loading...",
          read_more: "Read More",
          date: "Date",
          home_team: "Home Team",
          venue: "Venue",
          NBA: "NBA Season 2024 Stat Leaderboard",
          nba_player: "NBA Players",
          points: "Points",
          assists: "Assists",
          rebounds: "Rebounds",
          steals: "Steals",
          blocks: "Blocks",
          NFL: "NFL Season 2024 Stat Leaderboard",
          quarterbacks: "Quarterbacks",
          passing_yards: "Passing Yards",
          rushing_yards: "Rushing Yards",
          touchdowns: "Touchdowns",
          wide_receivers: "Wide Receivers",
          receiving_yards: "Receiving Yards",
          receptions: "Receptions",
          running_backs: "Running Backs",
          rushing_yards: "Rushing Yards",
          receptions: "Receptions",
          defensive_players: "Defensive Players",
          tackles: "Tackles",
          sacks: "Sacks",
          interceptions: "Interceptions",
          nba_players: "NBA Players",  
          nba_offensive_players: "NBA Offensive Players",
          nba_defensive_players: "NBA Defensive Players",
          three_pointers_percentage: "3-Point Percentage",
        }
      },
      es: {
        translation: {
          greeting_1: "¡Crea Tu ",
          greeting_2: "Experiencia Perfecta!",
          favorite_teams: "Tus equipos favoritos:",
          find_team: "Encuentra un equipo deportivo para agregar a favoritos:",
          switch_language: "Cambiar a inglés",
          full_name: "Nombre completo",
          email: "Correo electrónico",
          member_since: "¡Has sido un miembro leal desde",
          sign_out: "Cerrar sesión",
          filter_teams: "Filtrar por tus equipos favoritos:",
          scores_title: "Equipos - Últimos Resultados",
          stats_nav: "Estadísticas",
          scores_nav: "Resultados",
          schedule_nav: "Calendario",
          news_nav: "Noticias",
          add_remove: "¡Añade o elimina equipos en tu página de cuenta!",
          news_title: "Mostrando información sobre la ",
          no_game_data: "No hay datos de juegos recientes disponibles",
          choose_sport: "Elige tu deporte:",
          scores_date: "Fecha: ",
          last_game: "Último Partido:",
          news_articles: "Artículos de Noticias Deportivas",
          no_articles_found: "No se encontraron artículos",
          loading: "Cargando...",
          read_more: "Leer más",
          date: "Fecha",
          home_team: "Equipo Local",
          venue: "Lugar",
          NBA: "Tabla de clasificación de estadísticas de la temporada 2024 de la NBA",
          nba_player: "Jugadores de la NBA",
          points: "Puntos",
          assists: "Asistencias",
          rebounds: "Rebotes",
          steals: "Robos",
          blocks: "Bloqueos",
          NFL: "Tabla de clasificación de estadísticas de la temporada 2024 de la NFL",
          quarterbacks: "Mariscales de campo",
          passing_yards: "Yardas de pase",
          rushing_yards: "Yardas de carrera",
          touchdowns: "Touchdowns",
          wide_receivers: "Receptores abiertos",
          receiving_yards: "Yardas de recepción",
          receptions: "Recepciones",
          running_backs: "Corredores",
          rushing_yards: "Yardas de carrera",
          receptions: "Recepciones",
          defensive_players: "Jugadores defensivos",
          tackles: "Tacleadas",
          sacks: "Capturas",
          interceptions: "Intercepciones",
          nba_players: "Jugadores de la NBA",
          nba_offensive_players: "Jugadores ofensivos de la NBA",
          nba_defensive_players: "Jugadores defensivos de la NBA",
          three_pointers_percentage: "Porcentaje de triples",
        }
      }
    },
    lng: localStorage.getItem('language') || 'en', // Default language setting
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
