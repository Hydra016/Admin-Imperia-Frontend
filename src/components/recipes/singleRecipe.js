import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleRecipe } from '../../features/recipes/recipeSlice'
import { CircularProgress } from '@material-ui/core'
import { useStyles } from '../../hooks/useStyles'

export default function SingleRecipe() {
  const { recipes, isLoading } = useSelector(state => state.recipe);
  const dispatch = useDispatch()
  const { id } = useParams()
  const { loaderContainer } = useStyles()

  useEffect(() => {
    dispatch(getSingleRecipe(id))
  }, [])
  
  if(!isLoading) {
    return (
      <div>
        {
          recipes && recipes.data.name
        }
        </div>
    )
  }

  return <div className={loaderContainer}><CircularProgress style={{ color: '#FF7B00' }} /></div>
}
