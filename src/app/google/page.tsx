import { useState } from "react";

export default function GoogleReviews() {
  const [placeId, setPlaceId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setReviews([]);

    try {
      const res = await fetch(`/api/getReviews?placeId=${placeId}`);
      const data = await res.json();

      if (res.ok) {
        setReviews(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch reviews");
    }
  };

  return (
    <div>
      <h1>Google Reviews</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="placeId">Place ID:</label>
          <input
            type="text"
            id="placeId"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
          />
        </div>
        <button type="submit">Fetch Reviews</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {reviews.map((review, index) => (
          <div key={index}>
            <h3>{review.author_name}</h3>
            <p>{review.text}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}