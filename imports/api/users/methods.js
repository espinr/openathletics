import { WebApp } from "meteor/webapp";
import { Meteor } from 'meteor/meteor';
import { Users } from './users.js';
import OpenTrack from '../../../both/lib/opentrack.js';



WebApp.handlers.get("/data/athletes", async (req, res) => { 
  const list = await Users.find(
    {
      'profile.public': true,
      'profile.name': {
        $nin: ['####UNKNOWN####', 'admin'],
      },
    },
    {
      fields: {
        'profile.firstName': 1,
        'profile.lastName': 1,
        'profile.gender': 1,
        'profile.locality': 1,
        'profile.countryId': 1,
        'profile.clubId': 1,
      },
    },
    { sort: { 'profile.lastName': 1 } }
  ).map((element) => {
    return OpenTrack.athleteToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/athletes/:id", async (req, res) => { 
  const query = { _id: req.params.id };
  const json = OpenTrack.athleteToOpentrack(await Users.findOneAsync(query));
  res.json(json);
});



