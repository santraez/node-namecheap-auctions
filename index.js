import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TOKEN;

async function fetchData() {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://aftermarketapi.namecheap.com/client/api/sales',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      page: 1,
      pageSize: 100,
      noNumbers: true,
      noHyphens: true,
      tld: 'com',
      orderBy: 'start_time',
      direction: 'asc',
    },
  };

  try {
    const { data } = await axios(config);
    data.items.forEach((item) => {
      console.log(JSON.stringify(item.name));
    });

    // const lastPage = data.pages.lastPage;

    // for (let i = 1; i <= lastPage; i++) {
    //   config.params.page = i;

    //   const { data } = await axios(config);
      
    //   const items = data.items;

    //   items.forEach((item) => {
    //     const name = (item.name).split('.')[0];
    //     console.log(JSON.stringify(name));
    //   });
    // }
  } catch (error) {
    console.log('Request failed:', error);
  }
}

fetchData();
