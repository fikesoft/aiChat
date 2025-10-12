export const useFetch = async ({ url, method, bodyObject }) => {
  try {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(bodyObject),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("API error", res.status, err);
      return;
    }
    const json = await res.json();
    console.log("API response", json);
  } catch (error) {
    console.error("fetch error", error);
  }
};
