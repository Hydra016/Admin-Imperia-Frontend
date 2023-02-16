import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipe } from "../../features/recipes/recipeSlice";
import { TextField, Button, IconButton, Typography, Box } from "@material-ui/core";
import { useStyles } from "../../hooks/useStyles";
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Alert } from '@mui/material';
import { useBase64 } from "../../hooks/useBase64";

export default function RecipePost() {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    time: "",
    portions: "",
    ingredients: [],
    instructions: "",
    image: [],
  });

  const dispatch = useDispatch();
  const postedRecipe = useSelector((state) => state.recipe);
  const [val, setVal] = useState([]);
  const { handleCreateBase64, logo } = useBase64([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("description", recipe.description);
    formData.append("time", recipe.time);
    formData.append("portions", recipe.portions);
    formData.append("ingredients", recipe.ingredients);
    formData.append("instructions", recipe.instructions);
    recipe.image.forEach((file) => {
      formData.append("image[]", file);
    });
    dispatch(postRecipe(formData));
  };

  // console.log(recipe.image)

  const {
    signupContainer,
    signupForm,
    signupFormField,
    signupFormFieldInstructions,
    signupFirstContainer,
    signupSecondContainer,
    signupThirdContainer,
    fileContainer,
    fileContainerIngredients,
    inputContainer,
    inputButton,
    inputIcon,
    inputMainContainer,
    uploadImage,
    submitButtonContainer,
    submitButton,
    submitInput,
    ingredientsContainer,
    ingTextFieldsContainer,
    noItemText
  } = useStyles();

  const handleIngredients = (onChangeValue, i) => {
    const inputData = [...val];
    inputData[i] = onChangeValue.target.value;
    setVal(inputData)
    setRecipe({ ...recipe, ingredients: inputData })
  };

  const handleAdd = () => {
    const newIngredients = [...val, []]
    setVal(newIngredients)
  }

  const handleDelete = (data) => {
    const newVal = val.filter(text => text !== data)
    setVal(newVal)
  }

  const handleImgDelete = (data) => {
    const newImg = recipe.image.filter(obj => obj.name !== data.name)
    setRecipe({...recipe, image: newImg})
  }

  const handleError = () => {
    if(postedRecipe && postedRecipe.recipes.msg || postedRecipe.recipes.data.createdAt ) {
      if(postedRecipe.recipes.msg) {
        return <Box style={{ width: 500, marginLeft: 25 }} mt={2}><Alert severity='error'>{postedRecipe.recipes.msg}</Alert></Box>
      } else if(postedRecipe.recipes.data) {
        return <Box style={{ width: 500, marginLeft: 25, marginBottom: 25 }} mt={2}><Alert severity='success'>Recipe Posted</Alert></Box>
      }
    }
    return null
  }

  console.log(logo)

  return (
    <Box style={{ width: '100%' }}>
    <div className={signupContainer}>
      <form className={signupForm} onSubmit={handleSubmit}>
        <div className={signupFirstContainer}>
          <div className={signupSecondContainer}>
            <TextField
              className={signupFormField}
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            />
            <TextField
              className={signupFormField}
              label="Time in minutes"
              variant="outlined"
              type="number"
              name="time"
              onChange={(e) => setRecipe({ ...recipe, time: e.target.value })}
            />
            <TextField
              className={signupFormField}
              label="Portions"
              variant="outlined"
              type="number"
              name="portions"
              onChange={(e) =>
                setRecipe({ ...recipe, portions: e.target.value })
              }
            />
          </div>
          <div className={signupThirdContainer}>
            <TextField
              style={{ width: "100%" }}
              minRows={8}
              multiline
              label="Description"
              variant="outlined"
              type="text"
              name="description"
              onChange={(e) =>
                setRecipe({ ...recipe, description: e.target.value })
              }
            />
          </div>
        </div>
        <TextField
          minRows={8}
          multiline
          className={signupFormFieldInstructions}
          label="Instructions"
          variant="outlined"
          type="text"
          name="instructions"
          onChange={(e) =>
            setRecipe({ ...recipe, instructions: e.target.value })
          }
        />
        <div className={fileContainer}>
        <div className={fileContainerIngredients}>
        <div className={ingredientsContainer}>
        <Button endIcon={<AddBoxIcon />} variant="contained" style={{ backgroundColor: '#FF7B00', color: '#FFF' }} onClick={() => handleAdd()}>
          <Typography variant="subtitle">
          Add Ingredient
          </Typography>
        </Button>
        <div className={ingTextFieldsContainer}>
        {val.length === 0 ? <div className={noItemText}><Typography variant="subtitle">No Ingredients Added Yet!</Typography></div>: val.map((data, i) => {
          return (
            <TextField
            InputProps={{
              endAdornment: (<IconButton onClick={() => handleDelete(data)}><DeleteIcon /></IconButton>)
            }}
            style={{ marginTop: 10, width: '100%' }}
              value={data}
              label="Ingredients"
              variant="outlined"
              type="text"
              name="ingredients"
              onChange={e => handleIngredients(e,i)}
            />
          );
        })}
        </div>
        </div>
        <div className={inputMainContainer}>
        <div className={inputContainer}>
        <input
          className={inputButton}
          type="file"
          name="image[]"
          multiple
          onChange={(e) => {
            setRecipe({ ...recipe, image: Array.from(e.target.files) })
            handleCreateBase64(Object.values(e.target.files))
          }
        }
        />
        <div className={inputIcon}>
          <CloudUploadIcon style={{ fontSize: 50, fill: '#FF7B00' }} />
          <Typography variant="subtitle">
          Upload Files
          </Typography>
        </div>
        </div>
        <div>
        {recipe.image.map(img => {
          return (
             <div className={uploadImage}>
              <Typography variant="subtitle">
              {img.name}
              </Typography>
              <div>
                <IconButton onClick={() => handleImgDelete(img)}><DeleteIcon /></IconButton>
              </div>
            </div>
          )
        })}
       
        </div>
        </div>
        </div>
        <div className={submitButtonContainer}>
          <input className={submitInput} type="submit" />
          <div className={submitButton} >
          <Typography style={{ marginRight: 5 }} variant="subtitle">Submit</Typography>
          <ChevronRightIcon/>
          </div>          
          </div>
        </div>
      </form>
    </div>
    {handleError()}
    </Box>
  );
}
