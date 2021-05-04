import React from 'react'

interface CardProps {
  title: string,
  // children:React.ReactNode
}

// WithChildren helper type
type WithChildren<T = {}> = T & {children: React.ReactNode}

type AnthorCardProps = { title: string } & WithChildren;

export function Card({title, children}:WithChildren<CardProps>) {
  return (
    <section className="cards">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

