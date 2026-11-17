// projectData.js
// Store Drive preview URLs for large video files; keep thumbnails local.

export const projectData = [
  {
    title: "Ajira for She",
    client: "Patrick Karanja",
    category: "Campaigns",
    description: "Campaign film supporting women's participation in digital work.",
    thumbnail: "assets/ajira/ajira-for-she-2.png",
    video: "https://drive.google.com/file/d/1pEM1JVei1QqiwUTtPPtY6rfO2ZjyPcV4/preview"
  },
  {
    title: "KEPSA Event Highlights",
    client: "KEPSA",
    category: "Corporate Events",
    description: "Event documentation and leadership coverage for national private-sector programming.",
    thumbnail: "assets/kepsa/kepsa-event-2.jpg",
    video: "https://drive.google.com/file/d/1FOHCGO-JszwiElOqGcUxutsYVxAEzzqe/preview"
  },
  {
    title: "Swvl M-Pesa Integration",
    client: "Swvl",
    category: "Motion Graphics",
    description: "Product communication and motion work for the M-Pesa integration campaign.",
    thumbnail: "assets/swvl/swvl-bus.png",
    video: "https://drive.google.com/file/d/1yCnA4MXfxHof4TigPL1XE8jLFOdG1wtx/preview"
  }
];

if (typeof window !== "undefined") {
  window.projectData = projectData;
}