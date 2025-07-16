const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Goal = require('../models/Goal');
const User = require('../models/User'); 
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find().populate('members', 'name email');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch groups' });
  }
});


router.post('/join/:groupId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    if (!group.members.includes(req.user.id)) {
      group.members.push(req.user.id);
      await group.save();
    }


    const user = await User.findById(req.user.id);
    user.groupId = group._id;
    await user.save();

    res.json({ msg: 'Joined group successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to join group' });
  }
});


router.post('/create', auth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ msg: 'Group name is required' });
    }

    const newGroup = await Group.create({
      name: name.trim(),
      members: [req.user.id], 
    });


    const user = await User.findById(req.user.id);
    user.groupId = newGroup._id;
    await user.save();

    res.status(201).json(newGroup);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create group' });
  }
});


router.get('/:groupId/details', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('members', 'name email');
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    const goals = await Goal.find({ groupId: req.params.groupId });

    res.json({ group, goals });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch group details' });
  }
});


router.delete('/:groupId', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    if (String(group.members[0]) !== req.user.id) {
      return res.status(403).json({ msg: 'Only the creator can delete this group' });
    }

    await Goal.deleteMany({ groupId: req.params.groupId });
    await group.deleteOne();

    res.json({ msg: 'Group deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete group' });
  }
});

module.exports = router;