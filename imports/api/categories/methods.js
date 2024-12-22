import { WebApp } from "meteor/webapp";
import { Categories } from './categories.js';
import OpenTrack from '../../../both/lib/opentrack.js';

import { Races } from '../races/races.js';



WebApp.handlers.get("/data/categories", async (req, res) => { 
  const list = await Categories.find({ deleted: { $ne: true } }).map((element) => {
    return OpenTrack.categoryToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/categories/:id", async (req, res) => { 
  const { id } = req.params
  const query = { identifier: id };
  const json = OpenTrack.categoryToOpentrack(await Categories.findOneAsync(query));
  res.json(json);
});

