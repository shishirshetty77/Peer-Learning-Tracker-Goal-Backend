const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');


router.get('/test', (req, res) => {
  res.send('Goals route is working ✅');
});


router.post('/', auth, async (req, res) => {
  try {
    const { title, deadline, progress } = req.body;

    const newGoal = new Goal({
      title,
      deadline,
      progress: progress || 0,
      userId: req.user.id,
      groupId: req.user.groupId, 
    });

    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create goal' });
  }
});


router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch goals' });
  }
});


router.get('/by-group/:groupId', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ groupId: req.params.groupId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch group goals' });
  }
});


router.put('/:id', auth, async (req, res) => {
  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ msg: 'Goal not found or not authorized' });
    }

    res.json(updatedGoal);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update goal' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, 
    });

    if (!deleted) return res.status(404).json({ msg: 'Goal not found or not authorized' });

    res.json({ msg: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete goal' });
  }
});

module.exports = router;