const { Router } = require('express');
const Reviews = require('../models/Reviews');
const Room = require('../models/Room');

const router = Router();

router.post('/:roomId', async (req, res) => {
    const { roomId } = req.params;
    const { id } = req.user;
    try {
        const room = await Room.findById(roomId)
        if(room.userId == id){
            res.status(400).json({message: "User can't create a review on your own room"})
            return 
        }
        
        // const newReview = await Reviews.create({...req.body, roomId, userId: id});
        
        const newReview = {...req.body, roomId, userId: id};
        const reviewDb = await Reviews.create(newReview)
        
        await Room.findByIdAndUpdate(roomId, {$push: {reviews: reviewDb._id}}, 
        )
        res.status(201).json(reviewDb)
    }
     catch (error) {
        res.status(500).json({message: 'Error while trying to create a new review', error});
    }
})


router.get('/:roomId', async (req, res) => {
    const { roomId } = req.params
    try {
        const oneReview = await Reviews.find({roomId}).populate('userId roomId', 'username name');
        res.status(200).json(oneReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  });



  router.delete('/:reviewId', async (req,res) => {
      const { reviewId } = req.params
      const { id } = req.user
      try {
          const review = await Reviews.findById(reviewId)
          if(review.userId != id){
              res.status(400).json('User can only delete own review')
              return
          }
          await Reviews.findByIdAndDelete(reviewId)

          await Room.findByIdAndUpdate(review.roomId , {
              $pull: {reviews: reviewId}
          })
          res.status(200).json({message: 'Review deleted'})

      } catch (error) {
        res.status(500).json({message:'Error while trying to delete review', error})
      }
  })

router.put('/:reviewId', async (req,res) => {
    const { reviewId } = req.params
    const { id } = req.user
try {
    const updateReview = await Reviews.findOneAndUpdate ({_id: reviewId, userId: id}, req.body, {new:true})
    res.status(200).json(updateReview)
} catch (error) {
    res.status(500).json({message:'Error while trying to update review', error})
}
})




  module.exports = router;