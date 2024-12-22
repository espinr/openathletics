import { WebApp } from "meteor/webapp";
import { Disciplines } from './disciplines.js';
import OpenTrack from '../../../both/lib/opentrack.js';



WebApp.handlers.get("/data/disciplines", async (req, res) => { 
  const list = await Disciplines.find({}).map((element) => {
    return OpenTrack.disciplineToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/disciplines/:id", async (req, res) => { 
  const query = { identifier: req.params.id };
  const json = OpenTrack.disciplineToOpentrack(await Disciplines.findOneAsync(query));
  res.json(json);
});
