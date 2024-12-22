// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { categories } from '../../../stores/categories.js';
import { countries } from '../../../stores/countries';
import { Countries } from '../../api/countries/countries';
import { Races } from '../../api/races/races';
import { CompetitionFeatures } from '../../api/competitionFeatures/competitionFeatures';
import { Federations } from '../../api/federations/federations';
import { federations } from '../../../stores/federations';
import { Clubs } from '../../api/clubs/clubs';
import { Disciplines } from '../../api/disciplines/disciplines';
import { Users } from '../../api/users/users.js';
import { clubsEsp } from '../../../stores/external/clubs_esp.js';
import { competitionFeatures } from '../../../stores/competitionFeatures';
import { competitionsEAA2018 } from '../../../stores/external/competitionsEAA2018';
import { athletesIAAF } from '../../../stores/external/athletesIAAF';
import { disciplinesIAAF } from '../../../stores/disciplinesIAAF';
import { Categories } from '../../api/categories/categories.js';



Meteor.startup(async () => {

  // Load for the first time the countries
  if (await Countries.find({}).countAsync() < 1) {
    for (let i = 0; i < countries.length; i += 1) {
      Countries.insertAsync(countries[i]);
    }
  }

  // Load for the first time the categories
  if (await Categories.find({}).countAsync() < 1) {
    for (let i = 0; i < categories.length; i += 1) {
      Categories.insertAsync(categories[i]);
    }
  }

  // Load the list of federations
  if (await Federations.find({}).countAsync() < 1) {
    for (let i = 0; i < federations.length; i += 1) {
      Federations.insertAsync(federations[i]);
    }
  }

  // Load for the first time the competition features
  if (await CompetitionFeatures.find({}).countAsync() < 1) {
    for (let i = 0; i < competitionFeatures.length; i += 1) {
      CompetitionFeatures.insertAsync(competitionFeatures[i]);
    }
  }

  // Load for the first time the IAAF disciplines
  if (await Disciplines.find({ identifier: disciplinesIAAF[0].identifier }).countAsync() < 1) {
    for (let i = 0; i < disciplinesIAAF.length; i += 1) {
      Disciplines.insertAsync(disciplinesIAAF[i]);
    }
  }

  // Load the list of clubs of spain
  if (await Clubs.find({ alternate: 'UNATTACHED' }).countAsync() === 0) {
    Clubs.insertAsync({ alternate: 'UNATTACHED', name: 'UNATTACHED' });
    for (let i = 0; i < clubsEsp.length; i += 1) {
      const idClub = await Clubs.insertAsync(clubsEsp[i]);
      // Adds the country to the club
      const spain = await Countries.findOneAsync({ 'codes.iso': 'ESP' });
      Clubs.updateAsync(idClub, {
        $set: {
          countryId: spain._id,
          'location.address.addressCountry': spain.codes.iso,
        },
      });
    }
  }

  // Load the 2018 calendar of EAA
  if (await Races.find({ name: competitionsEAA2018[0].name, description: competitionsEAA2018[0].description }).countAsync() === 0) {
    for (let i = 0; i < competitionsEAA2018.length; i += 1) {
      // Changes the country code for the real country
      const iocCode = competitionsEAA2018[i].location.address.addressCountry;
      const country = await Countries.findOneAsync({ 'codes.ioc': iocCode });
      const competition = competitionsEAA2018[i];
      if (country) {
        competition.countryId = country._id;
        competition.location.address.addressCountry = country.codes.iso;
      }
      competition.identifier = `EAA2018_${String(i).padStart(3, '0')}`;
      const idRace = await Races.insertAsync(competition);
      // As they may not be races, 
      Meteor.call('race.geocode', idRace);
    }
  }

  // IAAF athletes
  if (await Users.find({ username: athletesIAAF[0].username }).countAsync() === 0) {
    for (let i = 0; i < athletesIAAF.length; i += 1) {
      const athlete = athletesIAAF[i];
      const country = await Countries.findOneAsync({ 'codes.ioc': athlete.country });
      delete athlete.country;
      if (country) {
        athlete.profile.countryId = country._id;
      }
      athlete.birthDate = new Date(athlete.birthDate);
      try {
        Users.insertAsync(athlete);
      } catch (ex) {
      }
    }
  }
    
});



