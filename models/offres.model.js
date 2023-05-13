const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidatureSchema = new Schema({
    name: String,
    diploma:mongoose.Schema.Types.Mixed,
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'offres'
    },
    user: { type: mongoose.Schema.Types.ObjectId,
       ref: 'users' }
  });

const OffreSchema = new Schema({
    type: String,
    name : String,
    Description: String,
    date: String,
    niveau_etude:String,
    salaire: String,
    langues:String,
    lieu :String ,
    mot_cles:String,
    date_dexpiration:String,
   entreprisenom:String,
   CommentPostuler:String,
    candidatures: [CandidatureSchema]
}, {timestamps: true})



  

module.exports = mongoose.model('candidature', CandidatureSchema)

module.exports = mongoose.model('offres', OffreSchema)
