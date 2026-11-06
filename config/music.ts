/**
 * music.ts
 * ─────────────────────────────────────────────────────────────
 * Local audio playlist for the desktop music player widget.
 * 
 * How to add your own music:
 * 1. Download your favorite audio files (.mp3, .m4a, .wav).
 * 2. Place them into `portfolio-template/public/music/` (e.g. `track1.mp3`).
 * 3. Add an entry to the `playlist` array below with `src: "/music/track1.mp3"`.
 * ─────────────────────────────────────────────────────────────
 */

export interface Track {
  title: string
  artist: string
  album?: string
  /** Local path in /public, e.g. "/music/track1.mp3", or an online audio URL */
  src: string
  /** Optional cover image URL or /public path */
  cover?: string
}

export const playlist: Track[] = [
  {
    title: "Young and Beautiful",
    artist: "Lana Del Rey",
    album: "The Great Gatsby Soundtrack",
    src: "/music/YoungAndBeautiful.mp3",
    cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "American Wedding",
    artist: "Frank Ocean",
    album: "Nostalgia, Ultra",
    src: "/music/AmericanWedding.mp3",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Summertime Sadness",
    artist: "Lana Del Rey",
    album: "Born to Die",
    src: "/music/SummertimeSadness.mp3",
    cover: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Video Games",
    artist: "Lana Del Rey",
    album: "Born to Die",
    src: "/music/VideoGames.mp3",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "West Coast",
    artist: "Lana Del Rey",
    album: "Ultraviolence",
    src: "/music/WestCoast.mp3",
    cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Brooklyn Baby",
    artist: "Lana Del Rey",
    album: "Ultraviolence",
    src: "/music/BrooklynBaby.mp3",
    cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Love",
    artist: "Lana Del Rey",
    album: "Lust for Life",
    src: "/music/Love.mp3",
    cover: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Mariners Apartment Complex",
    artist: "Lana Del Rey",
    album: "Norman Fucking Rockwell!",
    src: "/music/MarinersApartmentComplex.mp3",
    cover: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Doin' Time",
    artist: "Lana Del Rey",
    album: "Norman Fucking Rockwell!",
    src: "/music/DoinTime.mp3",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Chemtrails Over the Country Club",
    artist: "Lana Del Rey",
    album: "Chemtrails Over the Country Club",
    src: "/music/Chemtrails.mp3",
    cover: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&auto=format&fit=crop&q=80",
  },
  {
    title: "Let The Light In",
    artist: "Lana Del Rey ft. Father John Misty",
    album: "Did You Know That There's a Tunnel Under Ocean Blvd",
    src: "/music/LetTheLightIn.mp3",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&auto=format&fit=crop&q=80",
  },
];

