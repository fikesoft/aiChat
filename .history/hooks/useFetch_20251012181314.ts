export const useFetch = async () => {
  try {
    const res = await fetch("/api/doc-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: text }),
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
