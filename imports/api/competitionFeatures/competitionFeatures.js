// Definition of the checkpoints collection
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

export const CompetitionFeatures = new Mongo.Collection('competitionFeatures');

export const CompetitionFeaturesSchema = new SimpleSchema({
  identifier: {
    type: String,
    label: 'Identifier',
    required: true,
  },
  name: {
    type: String,
    label: 'Name',
    required: true,
  },
  description: {
    type: String,
    label: 'Description',
    optional: true,
  },
});

CompetitionFeatures.deny({
  insert: () => false,
  update: () => true,
  remove: () => true,
});

CompetitionFeatures.allow({
  insert: () => true,
  update: () => false,
  remove: () => false,
});
