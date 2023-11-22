import React from 'react'

const posts = [
  {
    id: 1,
    title: 'Titulo del producto',
    href: '#',
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: 'Nov 11, 2023',
    datetime: '2023-07-11',
    category: { title: 'subtitulo', href: '#' },
  },
]

export default function VistaHistorial() {
  return (
    <div className="bg-gray py-10 ">
     
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-white-500">
                  {post.date}
                </time>
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a>
              </div>
              <div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white-900 group-hover:text-gray-600">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-white-600">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
  )
}
