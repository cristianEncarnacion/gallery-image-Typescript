// Data.ts
export async function getData() {
  const response = await fetch(
    "https://api.unsplash.com/search/photos?query=nature&per_page=10",
    {
      headers: {
        Authorization: "Client-ID ACCESS_KEY",
      },
    }
  );
  const data = await response.json();
  return data.results;
}
