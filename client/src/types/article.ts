//import * as mongoose from 'mongoose';
//export let ObjectId = mongoose.Schema.Types.ObjectId;
import { Schema, Types } from 'mongoose';
export class Article {
  _id: string
  name: string
  content: string
  autor: string
}
