import { useEffect, useState } from "react"

const API_KEY = import.meta.env.GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1/gifs";

export const useGif = (keyword?: string) => {
    const [gifUrl, setGifUrl] = useState();

    const fetchGif = async () => {
        try {
            const sanitizedQuery = keyword!.split(" ").join("");
            const response = await fetch(`${BASE_URL}/search?api_key${API_KEY}&q=${sanitizedQuery}&limit=1`);
            const { data } = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium?.url);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (keyword) fetchGif();
    }, [keyword]);

    return gifUrl;
}