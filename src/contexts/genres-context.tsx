import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type GenresContextData = {
  genres: GenreResponseProps[]
  selectedGenre: GenreResponseProps | undefined

  changeSelectedGenre: (genre: GenreResponseProps) => void
}

type GenresProviderProps = {
  children?: React.ReactNode
}

const GenresContext = createContext({} as GenresContextData)

export function GenresProvider({ children }: GenresProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>()

  const changeSelectedGenre = useCallback((genre: GenreResponseProps) => {
    setSelectedGenre(genre)
  }, [])

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <GenresContext.Provider value={{ genres, selectedGenre, changeSelectedGenre }}>
      {children}
    </GenresContext.Provider>
  )
}

export function useGenres() {
  return useContext(GenresContext)
}