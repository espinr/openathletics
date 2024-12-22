import { WebApp } from "meteor/webapp";
import { CompetitionFeatures } from './competitionFeatures';


WebApp.handlers.get("/data/competitionFeatures", async (req, res) => { 
  const list = await CompetitionFeatures.find().map((element) => {
    return element.identifier;
  });
  res.json(list);
});
  
