// i18n.js
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
          displaying_info_nfl: "Displaying information about ",
          no_game_data: "No recent game data available",
          choose_sport: "Choose Your Sport:",
          scores_date: "Date: ",
          last_game: "Last Game:"
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
          displaying_info_nba: "Mostrando información sobre la ",
          displaying_info_nfl: "Mostrando información sobre la",
          no_game_data: "No hay datos de juegos recientes disponibles",
          choose_sport: "Elige tu deporte:",
          scores_date: "Fetcha: ",
          last_game: "Último Partido:"
        }
      }
    },
    lng: localStorage.getItem('language') || 'en', // Default language setting
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
