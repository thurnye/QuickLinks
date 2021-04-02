const Outdoor = require("../models/outdoor")

module.exports = {
    outdoors,
    create,
    deleteEv,
}

async function outdoors(req, res) {
    let outDoorEvents = await Outdoor.find()
    res.render("outdoors/new", {
        "events": outDoorEvents,
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