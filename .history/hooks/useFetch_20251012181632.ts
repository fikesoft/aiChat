interface;
export const useFetch = async ({ url, method, bodyObject, errorMessage }) => {
  try {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(bodyObject),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(errorMessage, res.status, err);
      return;
    }
    const json = await res.json();
    return { response: json };
  } catch (error) {
    console.error("Fetch error", error);
  }
};
