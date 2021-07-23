const router =  require("express").Router();
const Contact = require("../models/Contacts");

//CREATE Contact
router.post("/", async(req, res) => {
    const newContact = new Contact(req.body);
    try {
         const savedContact = await newContact.save();
         res.status(200).json(savedContact);
 
    } catch(err) {
         res.status(500).json(err);
    }
 });

 // GET ALL CONTACTS
 router.get("/", async(req, res) => {
      try {
           const contacts = await Contact.find();
           res.status(200).json(contacts);

      } catch(err) {
           res.status(500).json(err);
      }
 })
 
//DELETE
router.delete("/:id", async(req, res) => {
     try {
          const contact = await Contact.findById(req.params.id);
          contact.delete();
          res.status(200).json("Contact has been deleted...");

     } catch(err) {
          res.status(500).json(err);
     }
})

module.exports = router;