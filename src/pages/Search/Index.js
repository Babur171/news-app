async function searchNews(q) {
	q = encodeURIComponent(q);
	const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
	  "method": "GET",
	  "headers": {
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
		"x-rapidapi-key": '',
		"x-bingapis-sdk": "true"
	  }
	});
	const body = await response.json();
	return body.value;
  }