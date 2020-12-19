import {types} from '@babel/core';

export type DataType = {
  title: string;
  key: string;
  terms: number;
  host: string;
  item: Array<{
    name: string;
    vote: number;
  }>;
};
