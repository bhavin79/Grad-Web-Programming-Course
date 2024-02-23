
import { albums, artists, recordcompanies } from './config/mongoCollection.js';
import { ObjectId } from 'mongodb';


const artists1 = {
    "name": "One Direction",
    "members": [
      "Harry styles",
      "Zyan",
      "Niall horan"
    ],
    "albums": [],
    dateFormed: Date.now(2010,7,23)
}

const artists2 = {
    "name": "Twenty One Pilots",
    "members": [
      "Tyler Joseph",
      "Josh Dun",
    ],
    "albums": [],
    dateFormed: Date.now(2009,1,22)
}

const album1 = {
    "title": "Blurryface",
    "genre": "POP",
    "artistId": new ObjectId("65d68e002bc2d23ba07f25e8"),
    "recordCompanyId": new ObjectId("65d68ce8ba1a508d8ceacc9f"),
    "songs": [
    "Stressed Out",
    "Doubt"
    ],
    releaseDate: Date.now(2015, 5, 17)
}

const album2 = {
    "title": "Made in the A.M.",
    "genre": "POP",
    "artistId": new ObjectId("65d68e002bc2d23ba07f25e7"),
    "recordCompanyId": new ObjectId("65d68ce8ba1a508d8ceacca0"),
    "songs": [
      "Drag Me Down",
      "History"
    ],
  releaseDate: Date.now(2015, 11,13)
}


const recordComapny1 = 
  {
    name: "Fueled by Ramen",
    foundedYear: new Date(2008),
    country: "USA",
    albums: []
  }

  const recordComapny2 = 
  {
    name: "Universal Music Group",
    foundedYear: new Date(1934),
    country: "Netherlands",
    albums: []
  }

export const seed = async()=>{
  const recodCompColleciton = await recordcompanies();
  await recodCompColleciton.insertOne(recordComapny1);
  await recodCompColleciton.insertOne(recordComapny2);

  const artitsCollection = await artists();
  await artitsCollection.insertOne(artists1);
  await artitsCollection.insertOne(artists2);

  const albumColleciton = await albums();
  await albumColleciton.insertOne(album1);
  await albumColleciton.insertOne(album2);

}

