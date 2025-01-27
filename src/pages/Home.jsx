import React, { useState, useEffect } from 'react'
import Header from '../components-home/Header'
import Genres from '../components-home/Genres'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const images = [
  {
    id: 1,
    src: './assets/comedy.jpeg',
    alt: 'Image 1',
    className: 'genre__img',
    genre: 'Comedy'
  },
  {
    id: 2,
    src: './assets/action.jpeg',
    alt: 'Image 2',
    className: 'genre__img',
    genre: 'Action'
  },
  {
    id: 3,
    src: './assets/horror.jpeg',
    alt: 'Image 3',
    className: 'genre__img',
    genre: 'Horror'
  },
  {
    id: 4,
    src: './assets/sci-fi.jpeg',
    alt: 'Image 4',
    className: 'genre__img',
    genre: 'Sci-Fi'
  },
  {
    id: 5,
    src: './assets/romance.jpeg',
    alt: 'Image 5',
    className: 'genre__img',
    genre: 'Romance'
  },
  {
    id: 6,
    src: './assets/history.jpeg',
    alt: 'Image 6',
    className: 'genre__img',
    genre: 'History'
  },
  {
    id: 7,
    src: './assets/mystery.jpeg',
    alt: 'Image 7',
    className: 'genre__img',
    genre: 'Mystery'
  },
  {
    id: 8,
    src: './assets/adventure.jpeg',
    alt: 'Image 8',
    className: 'genre__img',
    genre: 'Adventure'
  },
  {
    id: 9,
    src: './assets/family.jpeg',
    alt: 'Image 9',
    className: 'genre__img',
    genre: 'Family'
  },
  {
    id: 10,
    src: './assets/crime.jpeg',
    alt: 'Image 10',
    className: 'genre__img',
    genre: 'Crime'
  },
  {
    id: 11,
    src: './assets/paranormal.jpeg',
    alt: 'Image 11',
    className: 'genre__img',
    genre: 'Paranormal'
  },
  {
    id: 12,
    src: './assets/music.jpeg',
    alt: 'Image 12',
    className: 'genre__img',
    genre: 'Music'
  },
  {
    id: 13,
    src: './assets/sports.jpeg',
    alt: 'Image 13',
    className: 'genre__img',
    genre: 'Sports'
  },
  {
    id: 14,
    src: './assets/international.jpeg',
    alt: 'Image 14',
    className: 'genre__img',
    genre: 'International'
  },
  {
    id: 15,
    src: './assets/lgbtq.png',
    alt: 'Image 15',
    className: 'genre__img',
    genre: 'LGBTQ+'
  },
  {
    id: 16,
    src: './assets/stand-up.jpeg',
    alt: 'Image 16',
    className: 'genre__img',
    genre: 'Stand-Up'
  },
  {
    id: 17,
    src: './assets/thriller.jpeg',
    alt: 'Image 17',
    className: 'genre__img',
    genre: 'Thriller'
  },
  {
    id: 18,
    src: './assets/cult.jpeg',
    alt: 'Image 18',
    className: 'genre__img',
    genre: 'Cult'
  }
]

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      const promises = images.map(image => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = image.src
          img.onload = resolve
          img.onerror = reject
        })
      })

      try {
        await Promise.all(promises)
        setLoading(false)
      } catch (error) {
        console.error('Failed to load images', error)
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  if (loading) {
    return (
      <div>
        {images.map(image => (
          <Skeleton key={image.id} height={200} width={300} />
        ))}
      </div>
    )
  }

  return (
    <div id='home'>
      <div className='search__container'>
        <div className='row'>
          <div className='page__bg'>
            <div className='home__info'>
              <section id='landing'>
                <Header firstHalf={images.slice(0, 9)} />
              </section>
              <section id='genres'>
                <Genres secondHalf={images.slice(9)} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
