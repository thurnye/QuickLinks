const Outdoor = require("../models/outdoorModel")
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
            let foundEvent;


            // a simple function that will be called when a condition is met or not
            const addEventAndUser = () => {
                // add user to attendees
            Outdoor.findById(eventId, (err, outdoor) => {
                outdoor.Attendant.push({user: userId})
                outdoor.save()
            })
             // push the event to the list of upcoming events
             user.upcoming.push({event: eventId})
                return user.save((err) =>{
                    if(err) { 
                        console.log(err)  
                    }else{  
                        res.redirect('/')
                    }
                })
            }

            // incase of an empty list of upcoming events
            if(user.upcoming.length === 0){
                addEventAndUser()
            }

            //  if  user has event in upcoming
            for (let i=0; i < user.upcoming.length; i++) {
                console.log(i)
                if (user.upcoming[i].event._id.toString() === eventId.toString()) {
                    foundEvent = user.upcoming[i]
                }
            } 

            // if user is not in the event
            if(!foundEvent){
                addEventAndUser()
            }

            // if user is in the event
            if(foundEvent){
               return res.redirect('/stay_connected/all_events');
                // send a message to the user
            }
        }

        

    }catch(err){
        console.log(err)
    }
}


// get the user upcoming events
async function upcoming(req, res) {
    try{

        await User.findById(req.user._id).populate('upcoming.event').exec( (err, user) => {
            const upcoming = user.upcoming
            console.log(upcoming)
            res.render("outdoors/upcoming", {
                user: req.user,
                upcoming: upcoming
            })
        })

        // display the user upcoming events here
        
    }catch(err){
        console.log(err)
    }
}






