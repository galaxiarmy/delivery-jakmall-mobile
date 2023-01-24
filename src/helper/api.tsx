import axios from 'axios';

export const getDataJoke = async () => {
  try {
    const response = await axios.get('https://v2.jokeapi.dev/categories');

    if (response.status === 200) {
      return response.data.categories;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getDataJokeByCategory = async (category: any, amount: any) => {
  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/${category}?type=single&amount=${amount}`,
    );

    console.log(response.status, response.data);

    if (response.status === 200) {
      if (response.data.hasOwnProperty('jokes')) {
        return response.data.jokes;
      } else {
        return [];
      }
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
