async function getMoviesFromApi() {
    try {
        let response = await fetch('http://acesoft.ntigskovde.se/Ace-Software/search.php?type=wiki');
        let responseJson = await response.json();
        return responseJson.movies;
    } catch(error) {
        console.error(error);
    }
}