const Outdoor = require("../models/outdoor")
const user = require("../models/user")
const User = require("../models/user")

module.exports = {
    outdoors,
    create,
    allevents,
    deleteEv,
    addGoingEvent,
    upcoming,
}

async function outdoors(req, res) {
    let outDoorEvents = await Outdoor.find()
    res.render("outdoors/new", {
        "events": outDoorEvents,
        user: req.user,
    })
}

function create(req, res) {
    const outDoorEvent = new Outdoor(req.body)
    outDoorEvent.save(function(err) {
        if(err) return res.render('index')
    })
    res.redirect("/outdoor")
}


async function deleteEv(req, res) {
    Outdoor.find({
        _id: req.params.id}, 
        async function(err, events) {
            console.log(events)
            try {
                await events[0].remove()
                res.redirect("/outdoor")
            } catch (err) {
                console.log(err)
                return res.send("error")
            }
        })
}



// get all the events to be displayed for the user to choose
async function allevents(req, res) {
    try {
        const allEvents = await Outdoor.find()
        res.render("outdoors/all-events", {
            "events": allEvents,
            user: req.user,
        })
    }catch(err){
        console.log(err)
    }
}

// post the user going event, add to calendar and send an email
async function addGoingEvent(req, res) {
    try{
        if(req.user){
            const user = req.user
            const userId = req.user._id
            const eventId = req.params.id

            
            // push the event to the list of upcoming events
            user.upcoming.push({event: eventId})
            // add user to attendees
            console.log(eventId)
            Outdoor.findById(eventId, (err, outdoor) => {
                outdoor.Attendant.push({user: userId})
                outdoor.save()
            })



            return user.save((err) =>{
                if(err) { 
                    console.log(err)  
                }else{  
                    // res.redirect('/')
                }
            })
        }
        
        // console.log(user)
        

    }catch(err){
        console.log(err)
    }
}


// get the user upcoming events
async function upcoming(req, res) {
    try{
        // display the user upcoming events here
        res.render("outdoors/upcoming", {
            user: req.user,
        })
    }catch(err){
        console.log(err)
    }
}






