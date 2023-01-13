"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

//const express = require('express');
const app_1 = __importDefault(require("./app"));
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./db/db_config');

dotenv.config();

//=======START SERVER=======//
app_1.default.listen(process.env.PORT, () => {
  console.log(`Successfully started the server, listening on port: ${process.env.PORT}`);
});

//=======CONNECT TO DB=======//
mongoose.set('strictQuery', true);

mongoose
  .connect(config.dt.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Started the database");
  })
  .catch((err) => {
    console.log(err);
  });
