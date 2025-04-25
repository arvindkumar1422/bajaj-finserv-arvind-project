import { useQuery } from 'react-query';
import axios from 'axios';
import { Doctor } from '../types';

const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export const useDoctors = () => {
  return useQuery<Doctor[]>('doctors', async () => {
    const { data } = await axios.get(API_URL);
    return data;
  });
};