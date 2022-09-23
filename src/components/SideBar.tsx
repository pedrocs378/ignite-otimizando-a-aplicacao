import { useGenres } from "../contexts/genres-context";

import { GenreButton } from "./GenreButton";

export function SideBar() {
  const { genres, changeSelectedGenre, selectedGenre } = useGenres()

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <GenreButton
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => changeSelectedGenre(genre)}
            selected={selectedGenre?.id === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}