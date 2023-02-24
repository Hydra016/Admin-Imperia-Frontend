import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllRecipes } from '../../features/recipes/recipeSlice';
import { CircularProgress, Paper, Grid, Typography, Button } from '@material-ui/core';
import { useStyles } from '../../hooks/useStyles';
import Images from './components/Images';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Recipes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {recipes, isLoading} = useSelector(state => state.recipe)
  const { loaderContainer } = useStyles()
  const { t } = useTranslation()
useEffect(() => {
    dispatch(getAllRecipes())
}, [])

  if(!isLoading) {
    return (
          <Grid style={{ padding: 50 }} container xs={12} spacing={2} > 
            {
          recipes && recipes.data.map(recipe => {
            return (
              <Grid item lg={3} m={6}>
              <Paper key={recipe.id} elevation={2} style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 30 }}>
                <Images images={recipe.image} />
                <div style={{ padding: 20 }}>
                  <div>
                  <Typography variant='subtitle'>
                  {recipe.name}
                  </Typography>
                  </div>
                  <div>
                  <Typography variant='subtitle'>
                  Created At: {recipe.createdAt.slice(0,10)}
                  </Typography>
                  </div>
                  <Button style={{ marginTop: 50, backgroundColor: '#FF7B00', color: '#FFF' }} variant='contained' onClick={() => {
                  navigate(`Recipe/${recipe._id}`)
                }}>
                  {t("view_recipes")}
                </Button>
                </div>
              </Paper>
              </Grid>
            )
          })
         }
          </Grid>
    )
  }
  
  return <div className={loaderContainer}><CircularProgress style={{ color: '#FF7B00' }} /></div>
}
