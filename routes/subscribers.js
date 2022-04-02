import express from "express"
import Subscriber from '../models/subscriber.js'
const router=express.Router()



//get all
router.get('/',async(req,res)=>{
    try{
        const subscribers=await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//make one 
router.post('/',async(req,res)=>{
    const subscriber= new Subscriber({
        HWID: req.body.HWID,
        custType: req.body.custType
    })
    try{
        const newSubscriber=await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err){
        res.status(400).json({message: err.message})
    }

})

//get one 
router.get('/:id',getSubscriber,(req,res)=>{
    res.status(202).json(res.subscriber)

})


router.post('/test',async(req,res)=>{
    try{
        var Answer=false;
        const subscribers=await Subscriber.find({HWID :{$regex: `${req.body.HWID}`}})
        if (subscribers.length===0){
            res.json(Answer)
        }
        else{
            var Difference_In_Time = new Date() - subscribers[0].lastDate;
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            var str=subscribers[0].custType;
            if (Difference_In_Days<30 || str.localeCompare("Perma")===0)
            {
                Answer=true
            }
            res.json(Answer)
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

router.post('/id',async(req,res)=>{
    try{
        var Answer=false;
        const subscribers=await Subscriber.find({HWID :{$regex: `${req.body.HWID}`}})
        res.json(subscribers)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
//update
router.patch('/:id',getSubscriberHWID,async (req,res)=>{
    console.log(res.subscriber);
    res.lastDate= new Date();
    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

//delete
router.delete('/:id',getSubscriber,async (req,res)=>{
    try{
        var id = res.subscriber.id
        await res.subscriber.remove()
        res.json({message: 'deleted sub ' + id })
    }catch(err){
        res.status(500).json({message1: err.message})
    }

})


async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber=await Subscriber.findById(req.params.id)
        if (subscriber===null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({message1: err.message})
    }

    res.subscriber=subscriber 
    next()
}

async function getSubscriberHWID(req,res,next){
    let subscriber
    try{
        subscriber=await Subscriber.find({HWID :{$regex: `${req.params.id}`}})
        if (subscriber===null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    }catch(err){
        return res.status(500).json({message1: err.message})
    }

    res.subscriber=subscriber 
    next()
}
export default router