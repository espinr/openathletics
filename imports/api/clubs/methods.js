import { WebApp } from "meteor/webapp";
import { Clubs } from './clubs';
import OpenTrack from '../../../both/lib/opentrack.js';



WebApp.handlers.get("/data/clubs", async (req, res) => { 
  const list = await Clubs.find({ alternate: { $ne: 'UNATTACHED' } }, { sort: { name: 1 } }).map((element) => {
    return OpenTrack.clubToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/clubs/:id", async (req, res) => { 
  const query = { identifier: req.params.id };
  const json = OpenTrack.clubToOpentrack(await Clubs.findOneAsync(query));
  res.json(json);
});
