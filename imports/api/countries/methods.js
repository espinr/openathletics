import { WebApp } from "meteor/webapp";
import { Countries } from './countries.js';
import OpenTrack from '../../../both/lib/opentrack.js';



WebApp.handlers.get("/data/countries", async (req, res) => { 
  const list = await Countries.find().map((element) => {
    return OpenTrack.countryToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/countries/:id", async (req, res) => { 
  const query = { 'codes.iso': req.params.id };
  const json = OpenTrack.countryToOpentrack(await Countries.findOneAsync(query));
  res.json(json);
});
