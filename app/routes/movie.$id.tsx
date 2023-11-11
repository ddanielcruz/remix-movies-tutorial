import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const movieId = params.id
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  })

  return json(await response.json())
}

export default function MovieId() {
  const movie = useLoaderData<Movie>()

  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="h-[40vh] w-full object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold text-center pt-5">{movie.title}</h1>
      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h2>
            <span className="underline">Homepage:</span>{' '}
            <Link to={movie.homepage} target="_blank">
              {movie.homepage}
            </Link>
          </h2>

          <h2>
            <span className="underline">Original language:</span> {movie.original_language}
          </h2>

          <p>
            <span className="underline">Overview:</span> {movie.overview}
          </p>

          <p>
            <span className="underline">Release Date:</span> {movie.release_date}
          </p>
        </div>
      </div>
    </div>
  )
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}
