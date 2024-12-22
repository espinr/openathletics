// Definition of the checkpoints collection with static values about checkpoints 
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';
import Common from '../../../both/lib/common.js';

import SimpleSchema from 'simpl-schema';

export const Checkpoints = new Mongo.Collection('checkpoints');


export const CheckpointsSchema = new SimpleSchema({
  identifier: {
    type: String,
    label: 'Checkpoint Identifier (the ID of the device)',
    required: true,
  },
  description: {
    type: String,
    label: 'Description',
    optional: true,
  },
  name: {
    type: String,
    label: 'Name',
    required: true,
  },
  notes: {
    type: String,
    label: 'Notes',
    autoform: {
      type: 'textarea',
    },
    optional: true,
  },
});


