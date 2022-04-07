const { Router } = require('express');
const Room = require('../models/Room.js');
const Reviews = require('../models/Reviews')
// const User = require('../models/User.js');

const router = Router(); 

router.get('/', async (req, res) => {
    try {
        const allRooms = await Room.find();
        res.status(200).json(allRooms);

    } catch (error) {
        res.status(500).json({message: "Could not get all rooms", error});
    }
})


router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params
  try {
      const room = await Room.findById(roomId)
      .populate({
        path: 'reviews',
        select: ['comment', 'userId'],
        populate: {path: 'userId', 
        // select: 'username'
      }
      });
      res.status(200).json(room);

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
})


router.post('/', async (req, res) => {
    const { id } = req.user
    try {
        const newRoom = await Room.create({...req.body, userId: id});
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
})

 
router.put('/:roomId', async (req, res) => {
    const { roomId } = req.params;
    // const payload = req.body;
    try {
      const updatedRoom = await Room.findOneAndUpdate(roomId, req.body, 
        {new: true}
        );
      if(!updatedRoom){
        throw new Error ('cannot update todo from another user')
      }
      res.status(200).json(updatedRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  
router.delete('/:roomId', async (req, res) => {
    const { roomId } = req.params;
    // const userId = req.user.id;
    try {
      await Room.findByIdAndDelete(roomId);
      await Reviews.deleteMany({ roomId })
      // if(room.user.toString() !== userId){
      //   throw new Error ('cannot delete another user\'s room')
      // }
      // delete()
      res.status(204).json();    
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })


module.exports = router;