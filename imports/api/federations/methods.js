import { WebApp } from "meteor/webapp";
import { Federations } from './federations.js';
import OpenTrack from '../../../both/lib/opentrack.js';


WebApp.handlers.get("/data/federations", async (req, res) => { 
  const list = await Federations.find({ deleted: { $ne: true } }).map((element) => {
    return OpenTrack.federationToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/federations/:id", async (req, res) => { 
  const { id } = req.params
  const query = { identifier: id };
  const json = OpenTrack.federationToOpentrack(await Federations.findOneAsync(query));
  res.json(json);
});
