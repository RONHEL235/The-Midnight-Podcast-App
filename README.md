# RONHEL235_FTO2306_GroupB_RoneeHelepi_DWACapstone

Name: Ronee Helepi

The Podcast App is a robust web application designed to provide users with a seamless podcast browsing and listening experience. Built with technologies like HTML, CSS, React, and styled components, this app integrates various functionalities to enable users to discover, explore, and enjoy podcasts effortlessly.
Utilizing the power of React Router DOM for smooth navigation, React MUI for enhanced UI components, and React Icons for visual elements, this app ensures an engaging interface. The integration of Vite optimizes the app's performance, making it responsive and efficient.
Additionally, authentication via Supabase enables users to log in and access personalized features like saving favorites and syncing preferences across devices. With an intuitive interface and a range of features, the Podcast App aims to redefine how users explore and enjoy their favorite podcasts.
 
 All views in the app display correctly on the smallest mobile device available, “iPhone SE”. This can be emulated in Chrome Dev tools.
 All favicon information has been created and added correctly via [RealFaviconGenerator](https://realfavicongenerator.net/). You are welcome to use any free PNG image from [Flaticon](https://www.flaticon.com/).
 All metatag information has been created and added via [MetaTags.io](https://metatags.io/). Use any free image on [Unsplash](https://unsplash.com/) and replace all URL values with absolute Netlify URLs after deployment.
 All show data loaded via a fetch call from the [Podcast API](https://podcast-api.netlify.app/shows).
 When viewing a specific show, data is loaded via fetch from an individual show endpoint.
 Loading states implemented for initial and new data loading.
 User can view show details by season, sorted by number.
 User can listen to any episode in a season of a show.
 User can view only episodes for a specific selected season.
 User can toggle between different seasons for the same show.
 User can see the names of all available shows on the platform with preview images.
 Show the amount of seasons and last update date for each show.
 Display associated genres for each show.
 Preview images of seasons for a specific show with the number of episodes per season.
 User can navigate back to a show view from a season-specific view.
 User can mark specific episodes as favorites and view all their favorites.
 Favorites are categorized by show and season with the ability to remove episodes.
 Sorting shows and favorites by title, date updated, and arranging favorites by show title or update date.
 Filtering shows by title and fuzzy matching using a tool like [Fuse.js](https://fusejs.io/).
 Automatically filter shows by genre when the genre label is clicked on.
 Display the date and time when an episode was added to favorites.
 Audio player shows progress and episode length timestamps and is always visible for continuous playback.
 Prompt user confirmation when attempting to close the page with active audio.
 App remembers the last listened show and episode, including episodes completed, progress, and where the user stopped listening.
 User can reset all their progress effectively removing their listening history.
 Presented sliding carousel of possible shows on the landing page.
 User authentication via [Supabase](https://app.supabase.com) with favorites stored in the database.
 Favorites automatically sync across devices when logged in.
 Users can share their favorites via a publicly accessible URL.

## Technologies Used

- HTML
- CSS
- Styled Components
- React
- React Router DOM
- React MUI
- React Icons
- FireBase
- Vite
