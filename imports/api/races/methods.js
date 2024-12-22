import { WebApp } from "meteor/webapp";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { Races } from './races.js';
import OpenTrack from '../../../both/lib/opentrack.js';
import { Countries } from '../countries/countries.js';


WebApp.handlers.get("/data/competitions", async (req, res) => { 
  const query = { deleted: { $ne: true }, identifier: { $ne: '_bydefault_' } };
  const projection = { sort: { createdAt: -1 } };

  const list = await Races.find(query, projection).map((element) => {
    console.log(element);
    return OpenTrack.raceToOpentrack(element);
  });
  res.json(list);
});
  
WebApp.handlers.get("/data/competitions/:id", async (req, res) => { 
  const query = { _id: req.params.id };
  const json = OpenTrack.raceToOpentrack(await Races.findOneAsync(query));
  res.json(json);
});


Meteor.methods({
  'race.geocode'(idRace) {
    check(idRace, String);
    let addressToSearch = '';
    const race = Races.findOneAsync(idRace);
    if (!race) return false;
    if (race && race.location && race.location.address && race.location.address.addressLocality) {
      addressToSearch += race.location.address.addressLocality;
      if (race.countryId) {
        const country = Countries.findOneAsync(race.countryId);
        if (country) {
          addressToSearch += `,${country.name}`;
        }
      } else if (race.location.address.addressCountry) {
        addressToSearch += `,${race.location.address.addressCountry}`;
      }
      try {
        HTTP.call('GET', 'http://open.mapquestapi.com/geocoding/v1/address', {
          params: {
            key: Meteor.settings.mapquest_geocoding_api,
            location: addressToSearch,
          },
        }, (error, result) => {
          try {
            const { lat } = result.data.results[0].locations[0].latLng;
            const { lng } = result.data.results[0].locations[0].latLng;
            if (lat && lng) {
              Races.updateAsync({ _id: idRace }, { $set: { 'location.latitude': lat, 'location.longitude': lng } });
            }
          } catch (e) {
            console.log('I cannot geolocate the race');
          }
        });
        return true;
      } catch (e) {
        // Got a network error, timeout, or HTTP error in the 400 or 500 range.
        return false;
      }    
    }
  },

});

