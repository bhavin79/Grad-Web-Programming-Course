import {GraphQLError} from 'graphql';
import { ObjectId } from 'mongodb';
import { albums, artists, recordcompanies } from './config/mongoCollection.js';
import { getAll, getOne, insertOne, deleteOne, findOneAndUpdate } from './dbAbstraction.js';
import validation from "./validation.js"
export const resolvers = {
    Query:{
        artists: async (_, args) =>{
            try {
                const result = await getAll(artists);
                return result;
            } catch (error) {
                
            }
        },
        albums : async (_, args) =>{
            try {
                const result = await getAll(albums);
                return result;
            } catch (error) {
                
            }
        },
        recordCompanies: async (_, args) =>{
            try {
                const result = await getAll(recordcompanies);
                return result;
            } catch (error) {
                
            }
        },
        getArtistById: async (_, args) =>{
            let {_id:id} = args;
            try {
                id = validation.validObjectId(id, "Artist id"); 
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                }) 
            }
            id = new ObjectId(id); 

            try {
                const result = await getOne(artists,{_id: id} )
                if(!result){
                    throw new GraphQLError("Artist Not found", {
                        extensions: {
                          code: 'NOT_FOUND',
                        },
                      })
                }
                return result;
            } catch (error) {
                
            }
        },

        getAlbumById: async (_, args) =>{
             let {_id:id} = args;
             try {
                id = validation.validObjectId(id, "Album id"); 
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                }) 
            }
             id = new ObjectId(id); 

                const result = await getOne(albums,{_id: id})
                if(!result){
                    throw new GraphQLError("Album Not found", {
                        extensions: {
                          code: 'NOT_FOUND',
                        },
                      })
                }
                return result;

        },


        getCompanyById:  async (_, args) =>{
            let {_id:id} = args;
            try {
                id = validation.validObjectId(id, "Record Company id"); 
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                }) 
            }
            id = new ObjectId(id); 

            try {
                const result = await getOne(recordcompanies,{_id: id} )
                if(!result){
                    throw new GraphQLError("recordcompany Not found", {
                        extensions: {
                          code: 'NOT_FOUND',
                        },
                      })
                }
               return result;
           } catch (error) {
               
           }
       },


       getSongsByArtistId: async (_, args) =>{
        let {artistId:id} = args;
        try {
            id = validation.validObjectId(id, "Artist id"); 
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }

        id = new ObjectId(id); 

        let result = [];
        try {

            const allAlbums = await getAll(albums, {artistId: id});
            for(let i =0; i<allAlbums.length; i++){
                const album = allAlbums[i];
                const {songs} = album;
                result.push(...songs);
            }
            if(!result){
                throw new GraphQLError("songs Not found", {
                    extensions: {
                      code: 'NOT_FOUND',
                    },
                  })
            }
            return result;
        } catch (error) {
            
        }
    },

    albumsByGenre: async (_, args) =>{
        const {genre} = args
        let regexGenre = new RegExp(genre, "i");
        try {
            const result = await getAll(albums,{genre: { $regex: regexGenre}})
            return result;
        } catch (error) {
            
        }
    },

    searchArtistByArtistName:  async (_, args) =>{
        let {searchTerm:name} = args;
        try {
            name = validation.validString(name,"serach term")
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
            },
    }) 
        }
        let regexName = new RegExp(name, "i");
        try {
            const result = await getAll(artists,{ name: { $regex: regexName} } )
            if(!result){
                throw new GraphQLError("Artist Not found", {
                    extensions: {
                      code: 'NOT_FOUND',
                    },
                  })
            }
            return result;
        } catch (error) {
            
        }
    },
    companyByFoundedYear: async(_, args)=>{
        console.log(args);
        let {min, max} = args; 
        try {
            min = validation.validNumber(min,"min",1900, 2024);
            max = validation.validNumber(max, "max", 1900, 2024);
            if (min>max) throw "Min cant be greater than max";
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
            },
         }) 
        }

        let response = await getAll(recordcompanies, {foundedYear: {$gte: min, $lte:max}});
        console.log(response);
        return response;
        //TODO: format dates; 
        //TODO: format id;
    }
  },
  Artist:{
    albums: async(parent)=>{
        try {
            const result = await getAll(albums,{artistId: parent._id});
            return result;
        } catch (error) {
            
        }
    },
    numOfAlbums: async(parent)=>{
        try {
            const result = await getAll(albums, {artistId: parent._id});
            return result.length;
        } catch (error) {
            
        }
    },

  }, 
  
  Album:{
    artist: async(parent)=>{
        try {
            const result = await getOne(artists, {_id: parent.artistId});
            return result;
        } catch (error) {
            
        }
    },

    recordCompany: async (parent) =>{
        try {
            const result = await getOne(recordcompanies, {_id: parent.recordCompanyId});
            return result;
        } catch (error) {
            
        }
    },
  },
  RecordCompany:{
    albums: async(parent)=>{
        try {
            const result = await getAll(albums,{recordCompanyId: parent._id});
            return result;
        } catch (error) {
            
        }
    },

    numOfAlbums: async(parent)=>{
        try {
            const result = await getAll(albums,{recordCompanyId: parent._id});
            return result.length;
        } catch (error) {
            
        }
    },
  },

  Mutation:{
    addArtist: async(_, args)=>{
        let {name, date_formed, members}  = args;
        //Input validation;
        try {
            name = validation.validString(name, "name");
            date_formed = validation.validDate(date_formed, "date");
            members = validation.validArrayOfStrings(members, "members");
        } catch (error) {
            throw new GraphQLError(error, {
                        extensions: {
                          code: 'BAD_USER_INPUT',
                    },
            }) 
        }

        console.log(name, date_formed, members);

        //check if name already exists;
        const exist = await getOne(artists, {name: name});
        if(exist != null){
            throw new GraphQLError("Name already exist", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }

        //creating db object;
        const obj =  {
            "name": name,
            "members": members,
            "albums": [],
            dateFormed: date_formed
        }

        const result = await insertOne(artists, obj);
        if(!result.acknowledged || !result.insertedId){
            throw new GraphQLError("Could not add", {
                extensions: {
                  code: 'INTERNAL_SERVER_ERROR',
                 },
            }) 
        }
        const response = await getOne(artists, {_id: result.insertedId});
        return response;
    },

     editArtist: async(_, args)=>{
        console.log(args);
        let {_id:id, name, date_formed:dateFormed, members} = args;
        let queryObj = {}
        try {
            id = validation.validObjectId(id, "artist id"); 
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        try {
            if(name){
                name = validation.validString(name, "name");
                queryObj.name = name;
            }
            if(dateFormed){
                dateFormed = validation.validDate(dateFormed, "dateFormed");
                queryObj.dateFormed = dateFormed;
            }
            if(members){
                members = validation.validArrayOfStrings(members, "members");
                queryObj.members = members;
        }
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
       

        //if artist exists;
        const exist = await getOne(artists, {_id: new ObjectId(id)});
        if(exist == null){
            throw new GraphQLError("Artist not found", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        let {albums:allAlbums} = exist;
        //check date for all the valid albums;
        if(dateFormed){
            for(let i = 0; i<allAlbums.length; i++){
                    let album = await getOne(albums, {_id: allAlbums[i]});
                    console.log(album);
                    let {releaseDate} = album;
                    
                    if(releaseDate.getFullYear()<dateFormed.getFullYear()){
                        throw new GraphQLError("album date cannot precede artist's formation date", {
                            extensions: {
                              code: 'BAD_USER_INPUT',
                             },
                        }) 
                    }
                    else if(releaseDate.getFullYear()==dateFormed.getFullYear()){
                        if(releaseDate.getMonth()<dateFormed.getMonth()){
                            throw new GraphQLError("album date cannot precede artist's formation date", {
                                extensions: {
                                  code: 'BAD_USER_INPUT',
                                 },
                            }) 
                        }
                        else if(releaseDate.getMonth()==dateFormed.getMonth()){
                            if(releaseDate.getDate()<dateFormed.getDate()){
                                throw new GraphQLError("album date cannot precede artist's formation date", {
                                    extensions: {
                                      code: 'BAD_USER_INPUT',
                                     },
                                }) 
                            }
                        }
                    }  
            }
        
        }
        let updateArtist = await findOneAndUpdate(artists, {_id:new ObjectId(id)},{$set: queryObj})
        let newArtist = await getOne(artists,{_id: updateArtist._id})
        return newArtist
    },

     removeArtist: async(_, args)=>{
        let {_id:id} = args;
        try {
            id= validation.validObjectId(id, "Artist Id");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }

        //if artist exist
        let artist = await getOne(artists, {_id: new ObjectId(id)});
        if(!artist){
            throw new GraphQLError("Artist not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }
        try {
            let removeArtist = await deleteOne(artists, {_id: new ObjectId(id)});
            console.log(removeArtist);
        } catch (error) {
            throw new GraphQLError("Could not remove artitst", {
                extensions: {
                  code: 'INTERNAL_SERVER_ERROR',
                 },
            }) 
        }

        const {albums: allAlbums} = artist;
        for(let i = 0; i<allAlbums.length; i++){
            try {
                let album = await getOne(albums, {_id: allAlbums[i]});
                console.log(album);
                let {recordCompanyId} = album;
                let deleteFromRecordCompnay = await findOneAndUpdate(recordcompanies,{_id: new ObjectId(recordCompanyId)},{$pull: {albums: new ObjectId(allAlbums[i])}});// remove album from record companies;
                let deleteAlbum = await deleteOne(albums, {_id: allAlbums[i]});
            } catch (error) {
                throw new GraphQLError("Could not remove albums by artist", {
                    extensions: {
                      code: 'INTERNAL_SERVER_ERROR',
                     },
                }) 
            }
           
        }

        return artist;
    },

     addCompany: async(_, args)=>{
        let {name, founded_year,country} = args;
        const regex = /^[a-zA-Z\s]+$/;

        try {
            name = validation.validString(name, "name");
            if(!regex.test(name)) throw `Name should have only letters`;
            founded_year = validation.validNumber(founded_year, "found year", 1900, 2024);
            country = validation.validString(country, "country");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
            }})
        }
       
        //check if name already exists;
        const exist = await getOne(recordcompanies, {name: name});
        if(exist != null){
            throw new GraphQLError("Name already exist", {
                extensions: {
                code: 'BAD_USER_INPUT',
                },
            }) 
        }

        let obj = {
            "name": name,
            "foundedYear": founded_year,
            "country": country,
            "albums": []            
        }
        const result = await insertOne(recordcompanies, obj);
        if(!result.acknowledged || !result.insertedId){
            throw new GraphQLError("Could not add", {
                extensions: {
                  code: 'INTERNAL_SERVER_ERROR',
                 },
            }) 
        }
        const response = await getOne(recordcompanies, {_id: result.insertedId});
        return response;
    },

     editCompany: async(_, args)=>{
        let{_id:id, name, founded_year:foundedYear, country} = args;
        const regex = /^[a-zA-Z\s]+$/;

        console.log(args);
        let queryObj = {}
        try {
            id = validation.validObjectId(id, "company id"); 
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        try {
            if(name){
                name = validation.validString(name, "name");
                if(!regex.test(name)) throw `Name should have only letters`;

                queryObj.name = name;
            }
            if(foundedYear){
                foundedYear = validation.validNumber(foundedYear, "foundedYear",1900, 2024 );
                queryObj.foundedYear = foundedYear;
            }
            if(country){
                country = validation.validString(country, "country");
                queryObj.country = country;
        }
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
       

        //if artist exists;
        const exist = await getOne(recordcompanies, {_id: new ObjectId(id)});
        if(exist == null){
            throw new GraphQLError("Record Company not found", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        let{albums: allAlbums} = exist;
        if(foundedYear){
            for(let i = 0; i<allAlbums.length; i++){
                    let album = await getOne(albums, {_id: allAlbums[i]});
                    console.log(album);
                    let {releaseDate} = album;
                    console.log(releaseDate.getFullYear(), foundedYear);
                    if(releaseDate.getFullYear()<foundedYear){
                        throw new GraphQLError("album date cannot precede Record Company's foundedYear", {
                            extensions: {
                              code: 'BAD_USER_INPUT',
                             },
                        }) 
                    } 
            }
        }

        let updateCompany = await findOneAndUpdate(recordcompanies,{_id: new ObjectId(id)}, {$set:queryObj}) 
        let newCompany = await getOne(recordcompanies, {_id:updateCompany._id})
        return newCompany;
    },

    removeCompany: async(_, args)=>{
        console.log(args);
        //if the company is delete then all the albums will be deleted from albums and artists;
        let {_id: id} = args;
        try {
            id = validation.validObjectId(id, "Album id"); 
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        const recordCompanyExist = await getOne(recordcompanies, {_id: new ObjectId(id)});
        if(recordCompanyExist == null){
            throw new GraphQLError("recordCompany not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }

        const {albums: allAlbums} = recordCompanyExist;
        for(let i = 0; i<allAlbums.length; i++){
            try {
                let album = await getOne(albums, {_id: allAlbums[i]});
                console.log(album);
                let deleteFromArtist = await findOneAndUpdate(artists,{_id: new ObjectId(album.artistId)},{$pull: {albums: album._id}});// remove album from record companies;
                let deleteAlbum = await deleteOne(albums, {_id: album._id});
            } catch (error) {
                throw new GraphQLError("Could not remove albums by artist", {
                    extensions: {
                      code: 'INTERNAL_SERVER_ERROR',
                     },
                }) 
            }
           
        }
        
        let removeCompany = await deleteOne(recordcompanies, {_id: recordCompanyExist._id});
        
        return recordCompanyExist;
    },    

     addAlbum: async(_, args)=>{
        console.log(args);
        let {title, releaseDate, genre, songs, artistId, companyId:recordCompanyId} = args;
        try {
            title = validation.validString(title, "title");
            releaseDate = validation.validDate(releaseDate, "releaseDate");
            genre = validation.validString(genre, "genre");
            songs = validation.validArrayOfStrings(songs, "songs");
            artistId = validation.validObjectId(artistId, "artistId");
            recordCompanyId = validation.validObjectId(recordCompanyId, "recordCompanyId");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                code: 'BAD_USER_INPUT',
                },
            }) 
        }
        //IF artist id is valid
        let artistExist = await getOne(artists, {_id: new ObjectId(artistId)});
        if(!artistExist){
            throw new GraphQLError("Artist not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }
        //Check dates
        if(releaseDate.getFullYear()<artistExist.dateFormed.getFullYear()){
            throw new GraphQLError("Release date cannot precede the artist's formation date", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        else if(releaseDate.getFullYear()==artistExist.dateFormed.getFullYear()){
            if(releaseDate.getMonth()<artistExist.dateFormed.getMonth()){
                throw new GraphQLError("Release date cannot precede the artist's formation date", {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                }) 
            }
            else if(releaseDate.getMonth()==artistExist.dateFormed.getMonth()){
                if(releaseDate.getDate()<artistExist.dateFormed.getDate()){
                    throw new GraphQLError("Release date cannot precede the artist's formation date", {
                        extensions: {
                          code: 'BAD_USER_INPUT',
                         },
                    }) 
                }
            }
        }

        //if record company id is valid;
        let recordCompanyExist = await getOne(recordcompanies, {_id: new ObjectId(recordCompanyId)});
        if(!recordCompanyExist){
            throw new GraphQLError("Record Company not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }

        //Check dates
        if(releaseDate.getFullYear()<recordCompanyExist.foundedYear){
            throw new GraphQLError("Release date cannot precede the Record comapany's formation date", {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }

        let obj = {
            "title": title,
            "releaseDate": releaseDate,
            "genre": genre,
            "songs": songs,
            "artistId": new ObjectId(artistId),
            "recordCompanyId": new ObjectId(recordCompanyId),
        }

        const result = await insertOne(albums, obj);
        if(!result.acknowledged || !result.insertedId){
            throw new GraphQLError("Could not add", {
                extensions: {
                  code: 'INTERNAL_SERVER_ERROR',
                 },
            }) 
        }

        //Add album in artist
        let albumAddInArtist = await findOneAndUpdate(artists, {_id:new ObjectId(artistId)}, {$push:{"albums":result.insertedId }})

        //Add album in record company
        let albumAddInRecordCompany = await findOneAndUpdate(recordcompanies, {_id: new ObjectId(recordCompanyId)}, {$push:{"albums":result.insertedId }})

        const album = await getOne(albums, {_id: result.insertedId});
        return album;
    },

     editAlbum: async(_, args)=>{
        console.log(args);
        let {_id:id, title, releaseDate, genre, artistId,companyId:recordCompanyId, songs}= args;
        console.log(args);
        let queryObj = {}
        try {
            id = validation.validObjectId(id, "Album id"); 
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        try {
            if(title){
                title = validation.validString(title, "title");
                queryObj.title = title;
            }
            if(releaseDate){
                releaseDate = validation.validDate(releaseDate, "releaseDate");
                queryObj.releaseDate = releaseDate;
            }
            if(genre){
                genre = validation.validString(genre, "genre");
                queryObj.genre = genre;
            }
            if(artistId){
                artistId = validation.validObjectId(artistId, "artistId");
                queryObj.artistId = new ObjectId( artistId);
            }
            if(recordCompanyId){
                recordCompanyId = validation.validObjectId(recordCompanyId, "recordCompanyId");
                queryObj.recordCompanyId = new ObjectId(recordCompanyId);
            }
            if(songs){
                songs = validation.validArrayOfStrings(songs, "songs");
                queryObj.songs = songs;
            }
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
       

        //if artist exists;
        const albumExist = await getOne(albums, {_id: new ObjectId(id)});
        if(albumExist == null){
            throw new GraphQLError("Album not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }

        let artistExist = undefined;

        if(artistId){
            artistExist = await getOne(artists, {_id: new ObjectId(artistId)});
            if(albumExist == null){
                throw new GraphQLError("Artist not found", {
                    extensions: {
                      code: 'NOT_FOUND',
                     },
             }) 
            }
         }
            
       
        let recordCompanyExist = undefined;

        if(recordCompanyId){
            recordCompanyExist = await getOne(recordcompanies, {_id: new ObjectId(recordCompanyId)});
            if(recordCompanyExist == null){
                throw new GraphQLError("Record Company not found", {
                    extensions: {
                      code: 'NOT_FOUND',
                     },
                }) 
            }
        }
          
        if(artistExist != null){
            //Remove album id from old artist
            let removeAlbumFromOldArtist = await findOneAndUpdate(artists, {_id:albumExist.artistId}, {$pull: {albums: new ObjectId(albumExist._id)}})
        
            //add album id to new artist;
            let addAlbumToNewArtist = await findOneAndUpdate(artists,{_id: new ObjectId(artistId)},{$push:{"albums": new ObjectId(albumExist._id)}});
        }

        if(recordCompanyExist != null){
                //Remove album id from old artist
                let removeAlbumFromOldRecordComp = await findOneAndUpdate(recordcompanies, {_id:albumExist.recordCompanyId}, {$pull: {albums: new ObjectId(albumExist._id)}})
            
                //add album id to new artist;
                let addAlbumToNewArtist = await findOneAndUpdate(recordcompanies,{_id: new ObjectId(recordCompanyId)},{$push:{"albums": new ObjectId(albumExist._id)}});
            }

        let editAlbum = await findOneAndUpdate(albums, {_id: new ObjectId(id)},{$set:queryObj})
        let newAlbum = await getOne(albums, {_id: new ObjectId(id)});
        return newAlbum;
    },

     removeAlbum: async(_, args)=>{
        console.log(args);
        let {_id: id} = args;
        try {
            id = validation.validObjectId(id, "Album id"); 
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        const albumExist = await getOne(albums, {_id: new ObjectId(id)});
        if(albumExist == null){
            throw new GraphQLError("Album not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }

        let removeAlbumfromArtist = await findOneAndUpdate(artists, {_id:albumExist.artistId}, {$pull: {"albums": albumExist._id }});
        let remveAlbumFromReordCompany = await findOneAndUpdate(recordcompanies, {_id: new ObjectId(albumExist.recordCompanyId)}, {$pull: {"albums":  albumExist._id}});
        let removeAlbum = await deleteOne(albums, {_id: albumExist._id});
        return albumExist;
    },    
  }
}