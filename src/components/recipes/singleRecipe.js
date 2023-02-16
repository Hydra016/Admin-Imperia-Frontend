import React from 'react'
import { useParams } from 'react-router-dom'

export default function SingleRecipe() {
  const { id } = useParams()
  console.log(id)

  return (
    <div>singleRecipe</div>
  )
}
