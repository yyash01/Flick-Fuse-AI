# Flick Fuse

```
"FlickFuse" combines "Flick," a casual term for a movie or film, with "Fuse," suggesting a merging or combining of
elements. Together, it implies a platform or system where movies are blended or united, perhaps indicating a diverse
range of film choices brought together in one place. The word "fuse" also conveys a sense of ignition or activation,
hinting at the dynamic and engaging nature of the movie suggestion system.
```

TODO :

1. I will remove the comments and then create a new repo for Production.

### Coding Convention

1. Always declare hook at the top level of component
2. admin@g.com , Admin@123

TMDB :
Api key = e341d0480e7cc36e28aef0233e155f2e
Api Read Access token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzQxZDA0ODBlN2NjMzZlMjhhZWYwMjMzZTE1NWYyZSIsInN1YiI6IjY2NDYxNzAzYTliNzQ4OGZiMmE5MDY3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H990qyvpTSrJvNCZ2zCT-Hmlie5pmHs_E728q3zfJ-w

Added :

- Update Store with movies Data
- Planning for MovieTrailer & MovieRecommendation Component
- Fetch Data for Trailer Video
- Update Store with Trailer Video Data
- Embedded the Yotube video and make it autoplay and mute
- Tailwind Classes to make Main Container look awesome

ADDED - for this commit =>

- index.css = added code for no scrollbar
- GptSearchBar = added searchBar component => added logic to call gemini AI responses.
- Header - added GptSearchBar component
- movieList - added no-scrollbar class at the right place
- MoviePlayer - Added null check for Trailer Video Loading
- MovieRecommendation - corrected the logic for movies lists shown and removed extra redux-store fetch for movies,added props for movies
- MovieTrailer - corrected code to fetch movies all together and pass in as props to child component.
- Constant - added openApi key , gemini Api -key
- added geminiAi.js config for GeminiAi
- added openAi config => But it is not needed now anymore due to that error => w'll remove it in future.
- movieSlice => Added new state property for holding searchResults.
- in package.json - added openai , generativeAi of google as packages.

![Landing Page](image.png)
