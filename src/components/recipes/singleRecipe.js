import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSingleRecipe } from '../../features/recipes/recipeSlice'
import { CircularProgress } from '@material-ui/core'
import { useStyles } from '../../hooks/useStyles'
import _ from 'lodash';

export default function SingleRecipe() {
  const { isLoading, recipe } = useSelector(state => state.recipe);
  const dispatch = useDispatch()
  const { id } = useParams()
  const { loaderContainer } = useStyles()

  useEffect(() => {
    dispatch(getSingleRecipe(id))
  }, [])
  
  if(!isLoading && _.values(recipe).some(x => x !== _.isEmpty)) {
    return (
      <div>
        {
          recipe.data.name
        }
        </div>
    )
  }

  return <div className={loaderContainer}><CircularProgress style={{ color: '#FF7B00' }} /></div>
}
