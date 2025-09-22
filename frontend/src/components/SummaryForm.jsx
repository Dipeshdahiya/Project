import React, { useState } from "react";
import api from "../api/axios";

export default function SummaryForm({ onNewSummary }) {
  const [title, setTitle] = useState("");
  const [productText, setProductText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    // Simple parser: "name | url | description"
    const products = productText
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|").map((s) => s.trim());
        return {
          name: parts[0] || "Unknown",
          url: parts[1] || "",
          description: parts[2] || "",
        };
      });

    try {
      const res = await api.post("/api/summaries", { title, products });
      onNewSummary(res.data);
      setTitle("");
      setProductText("");
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating summary");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Summary</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={productText}
        onChange={(e) => setProductText(e.target.value)}
        rows={6}
        placeholder="One product per line: name | url | description"
      />
      <button type="submit">Create Summary</button>
    </form>
  );
}
