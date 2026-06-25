// projectData.js
// Add one object per video. When you add new video files to assets/videos/ and
// thumbnails to assets/videos/thumbnails/, add a corresponding entry here and
// the Video Showcase page will automatically pick it up.

// Each entry format:
// {
//   title: "",
//   client: "",
//   category: "",
//   description: "",
//   thumbnail: "assets/videos/thumbnails/filename.jpg",
//   video: "assets/videos/path/to/file.mp4"
// }

export const projectData = [
  {
    title: "Featured Reel",
    client: "Patrick Karanja",
    category: "Motion Graphics",
    description: "A short featured reel showcasing my best work.",
    thumbnail: "assets/videos/thumbnails/featured.jpg",
    video: "assets/videos/featured.mp4"
  },
  {
    title: "Documentary: Youth Jobs",
    client: "Government",
    category: "Documentaries",
    description: "Event documentation and story-driven portrait of participants.",
    thumbnail: "assets/videos/thumbnails/youthjobs-thumb.jpg",
    video: "assets/videos/youthjobs/youthjobs-clip.mp4"
  },
  {
    title: "Corporate Event Highlights",
    client: "KEPSA",
    category: "Corporate Events",
    description: "Highlights from the national summit.",
    thumbnail: "assets/videos/thumbnails/kepsa-event-thumb.jpg",
    video: "assets/videos/kepsa/kepsa-highlights.mp4"
  }
  // Add more entries here. Supported formats: .mp4, .webm, .mov
];
