import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import backgroundImage from './images/back.avif';


const App = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [caloriesTotal, setCaloriesTotal] = useState(0);
  const [proteinTotal, setProteinTotal] = useState(0);
  const [carbohydrateTotal, setCarbohydrateTotal] = useState(0);
  const [fatTotal, setFatTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(null);

  const addFoodItem = (food) => {
    const updatedFoodItems = [...foodItems, food];
    setFoodItems(updatedFoodItems);
    setCaloriesTotal(caloriesTotal + parseInt(food.calories));
    setProteinTotal(proteinTotal + parseInt(food.protein));
    setCarbohydrateTotal(carbohydrateTotal + parseInt(food.carbohydrate));
    setFatTotal(fatTotal + parseInt(food.fat));
  };

  const deleteFoodItem = (index) => {
    const deletedFood = foodItems[index];
    const updatedFoodItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(updatedFoodItems);
    setCaloriesTotal(caloriesTotal - parseInt(deletedFood.calories));
    setProteinTotal(proteinTotal - parseInt(deletedFood.protein));
    setCarbohydrateTotal(carbohydrateTotal - parseInt(deletedFood.carbohydrate));
    setFatTotal(fatTotal - parseInt(deletedFood.fat));
  };

  const editFoodItem = (index) => {
    setEditIndex(index);
  };

  const updateFoodItem = (index, updatedFood) => {
    const updatedFoodItems = [...foodItems];
    const previousFood = updatedFoodItems[index];
    updatedFoodItems[index] = {
      ...previousFood,
      ...updatedFood,
    };
    setFoodItems(updatedFoodItems);
    setEditIndex(null);
  };

  return (
    <Container maxWidth="l">
      <Box mt={5} textAlign="center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Food Tracker
        </Typography>
        <FoodForm
          addFoodItem={addFoodItem}
          editIndex={editIndex}
          foodItems={foodItems}
          updateFoodItem={updateFoodItem}
        />
        <FoodTable
          foodItems={foodItems}
          deleteFoodItem={deleteFoodItem}
          editFoodItem={editFoodItem}
          editIndex={editIndex}
        />        
        <FoodSummary
          caloriesTotal={caloriesTotal}
          proteinTotal={proteinTotal}
          carbohydrateTotal={carbohydrateTotal}
          fatTotal={fatTotal}
        />
      </Box>
    </Container>
  );
};

const FoodForm = ({ addFoodItem, editIndex, foodItems, updateFoodItem }) => {
  const [food, setFood] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbohydrate: 0,
    fat: 0,
  });

  useEffect(() => {
    if (editIndex !== null) {
      const foodToEdit = foodItems[editIndex];
      setFood(foodToEdit);
    }
  }, [editIndex, foodItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFood((prevFood) => ({
      ...prevFood,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      updateFoodItem(editIndex, food);
    } else {
      addFoodItem(food);
    }
    setFood({
      name: '',
      calories: 0,
      protein: 0,
      carbohydrate: 0,
      fat: 0,
    });
  };

  const handleEdit = (index) => {
    setFood(foodItems[index]);
  };

  return (
    <Box 
      mt={3} 
      textAlign="center"
      alignContent="center"
      maxWidth="sm"
      >
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Food name"
          value={food.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          type="number"
          name="calories"
          label="Calories"
          value={food.calories}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          type="number"
          name="protein"
          label="Protein (g)"
          value={food.protein}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          type="number"
          name="carbohydrate"
          label="Carbohydrate (g)"
          value={food.carbohydrate}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          type="number"
          name="fat"
          label="Fat (g)"
          value={food.fat}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
        {editIndex !== null ? 'Update Food' : 'Add Food'}
        </Button>
        {editIndex !== null && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleEdit(null)}
            style={{ marginTop: '1rem' }}
            fullWidth
          >
            Cancel Edit
          </Button>
        )}
      </form>
    </Box>
  );
};

const FoodTable = ({ foodItems, deleteFoodItem, editFoodItem, editIndex }) => {
  return (
    <Box mt={3}  maxWidth="md">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Food Name</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Protein (g)</TableCell>
              <TableCell>Carbohydrate (g)</TableCell>
              <TableCell>Fat (g)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodItems.map((food, index) => (
              <TableRow key={index}>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.calories}</TableCell>
                <TableCell>{food.protein}</TableCell>
                <TableCell>{food.carbohydrate}</TableCell>
                <TableCell>{food.fat}</TableCell>
                <TableCell>
                {editIndex === index ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => editFoodItem(null)}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => editFoodItem(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteFoodItem(index)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};


const FoodSummary = ({
  caloriesTotal,
  proteinTotal,
  carbohydrateTotal,
  fatTotal,
}) => {
  return (
    <Box mt={3} textAlign="center" maxWidth="sm">
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow bgcolor='green'>
              <TableCell colSpan={2} align="left">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">{caloriesTotal}</TableCell>
              <TableCell align="right">{proteinTotal}</TableCell>
              <TableCell align="right">{carbohydrateTotal}</TableCell>
              <TableCell align="right">{fatTotal}</TableCell>
            </TableRow>
            <TableCell></TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
