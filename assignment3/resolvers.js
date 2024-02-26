import {assertSchema, GraphQLError} from 'graphql';
import { ObjectId } from 'mongodb';
import { albums, artists, recordcompanies, songs } from './config/mongoCollection.js';
import { getRedisClient } from './config/redisConnect.js';
import { getAll, getOne, insertOne, deleteOne, findOneAndUpdate, deleteMany } from './dbAbstraction.js';
import validation from "./validation.js"
export const resolvers = {
    Query:{
        artists: async (_, args) =>{
            const redisClient = await getRedisClient();

            try {
                let cacheArtits = await redisClient.get("AllArtists");
                if(cacheArtits){
                    console.log("hit the cache- All Artits");
                    let result = JSON.parse(cacheArtits);
                    return result
                }
            } catch (error) {
                console.log(error);
            }

            console.log("miss the cache- All Artits");
            try {
                const result = await getAll(artists);
                for(let i = 0; i<result.length; i++){
                    if(result[i]._id){
                        result[i]["id"] = result[i]._id.toString(); 
                    }
                    if(result[i].dateFormed){
                        result[i].dateFormed = validation.dateFormat(result[i].dateFormed);
                    }
                }
                try {
                    await redisClient.SET("AllArtists", JSON.stringify(result));
                    await redisClient.EXPIRE("AllArtists", 3600);
                } catch (error) {
                   console.log(error); 
                }
                return result;
            } catch (error) {
                
            }
        },
        albums : async (_, args) =>{
            const redisClient = await getRedisClient();

            try {
                let cacheAlbums = await redisClient.get("AllAlbums");
                if(cacheAlbums){
                    console.log("hit the cache - All Albums");
                    let result = JSON.parse(cacheAlbums);
                    return result
                }
            } catch (error) {
                console.log(error);
            }

            console.log("miss the cache - All Albums");

            try {
                const result = await getAll(albums);
                for(let i = 0; i<result.length; i++){
                    if(result[i]._id){
                        result[i]["id"] = result[i]._id.toString(); 
                    }
                    if(result[i].releaseDate){
                        result[i].releaseDate = validation.dateFormat(result[i].releaseDate);
                    }                
                }

                try {
                    await redisClient.SET("AllAlbums", JSON.stringify(result));
                    await redisClient.EXPIRE("AllAlbums", 3600);
                } catch (error) {
                   console.log(error); 
                }

                return result;
            } catch (error) {
                
            }
        },
        recordCompanies: async (_, args) =>{

             const redisClient = await getRedisClient();
            try {
                let cacheRecordCompanies = await redisClient.get("AllRecordCompanies");
                if(cacheRecordCompanies){
                    console.log("hit the cache - All Record Companies");
                    let result = JSON.parse(cacheRecordCompanies);
                    return result
                }
            } catch (error) {
                console.log(error);
            }

            console.log("miss the cache - All Record Companies");
            try {
                const result = await getAll(recordcompanies);
                for(let i = 0; i<result.length; i++){
                    if(result[i]._id){
                        result[i]["id"] = result[i]._id.toString(); 
                    }
                }
                try {
                    await redisClient.SET("AllRecordCompanies", JSON.stringify(result));
                    await redisClient.EXPIRE("AllRecordCompanies", 3600);
                } catch (error) {
                    console.log(error);
                }

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
            const redisClient = await getRedisClient();
            //check if it hits the cache;
            try {
                let cacheArtist = await redisClient.get(`${id}`);
                if(cacheArtist){
                    console.log("hit the cache - Single Artist");
                    let result = JSON.parse(cacheArtist);
                    return result
                }
            } catch (error) {
                console.log(error);
            }
            console.log("miss the cache - Single Artist");

            id = new ObjectId(id); 
            const result = await getOne(artists,{_id: id} )
            if(!result){
                throw new GraphQLError("Artist Not found", {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                    })
            }
            result.id = result._id.toString();
            result.dateFormed = validation.dateFormat(result.dateFormed);

            try {
                await redisClient.SET(`${result.id}`, JSON.stringify(result));
            } catch (error) {
                console.log(error);
            }
            return result;
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
            const redisClient = await getRedisClient();
            //check if it hits the cache;
            try {
                let cacheAlbum = await redisClient.get(`${id}`);
                if(cacheAlbum){
                    console.log("hit the cache - Single Album");
                    let result = JSON.parse(cacheAlbum);
                    return result
                }
            } catch (error) {
                console.log(error);
            }
            console.log("miss the cache - Single Album");

             id = new ObjectId(id); 

                const result = await getOne(albums,{_id: id})
                if(!result){
                    throw new GraphQLError("Album Not found", {
                        extensions: {
                          code: 'NOT_FOUND',
                        },
                      })
                }
                result.id = result._id.toString();
                result.releaseDate = validation.dateFormat(result.releaseDate);
                try {
                    await redisClient.SET(`${result.id}`, JSON.stringify(result));
                } catch (error) {
                    console.log(error);
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
            const redisClient = await getRedisClient();
            //check if it hits the cache;
            try {
                let cacheRC = await redisClient.get(`${id}`);
                if(cacheRC){
                    console.log("hit the cache - Single Record Company");
                    let result = JSON.parse(cacheRC);
                    return result
                }
            } catch (error) {
                console.log(error);
            }
            console.log("miss the cache -Single Record Company");
            id = new ObjectId(id); 

            const result = await getOne(recordcompanies,{_id: id} )
            if(!result){
                throw new GraphQLError("recordcompany Not found", {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                    })
            }
            result.id = result._id.toString();
            try {
                await redisClient.SET(`${result.id}`, JSON.stringify(result));
            } catch (error) {
                console.log(error);
            }
            return result;
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
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`getSongsByArtistId:${id}`);
            if(cache){
                console.log(`hit the cache-getSongsByArtistId`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- getSongsByArtistId`);
        id = new ObjectId(id); 
        let result = [];
        const allAlbums = await getAll(albums, {artistId: id});
        if(allAlbums.length<1){
            throw new GraphQLError("Artist Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
            })
        }

        for(let i =0; i<allAlbums.length; i++){
            const album = allAlbums[i];
            const {songs: allSong} = album;
            for(let j =0; j<allSong.length; j++){
                let song = await getOne(songs,{_id: new ObjectId(allSong[j])});
                song.id = song._id.toString();
                result.push(song);
            }
        }
        if(result.length<1){
            throw new GraphQLError("songs Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
                })
        }
        try {
            await redisClient.SET(`getSongsByArtistId:${id.toString()}`, JSON.stringify(result));
            await redisClient.EXPIRE(`getSongsByArtistId:${id.toString()}`, 3600);
        } catch (error) {
            console.log(error);
        }


        return result;
        
    },

    albumsByGenre: async (_, args) =>{
        let {genre} = args
        try {
            genre = validation.validGenre(genre);
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                },
            }) 
        }
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`albumsByGenre:${genre}`);
            if(cache){
                console.log(`hit the cache- albumsByGenre`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- albumsByGenre`);

        let regexGenre = new RegExp(genre, "i");
        const result = await getAll(albums,{genre: { $regex: regexGenre}})
        if(result.length<1){
            throw new GraphQLError("Albums Not found", {
                extensions: {
                  code: 'NOT_FOUND',
                },
              })
        }
        for(let i = 0; i<result.length; i++){
            if(result[i]._id){
                result[i]["id"] = result[i]._id.toString(); 
            }
            if(result[i].releaseDate){
                result[i].releaseDate = validation.dateFormat(result[i].releaseDate);
            }
        } 
        try {
            await redisClient.SET(`albumsByGenre:${genre}`, JSON.stringify(result));
            await redisClient.EXPIRE(`albumsByGenre:${genre})}`, 3600);
        } catch (error) {
            console.log(error);
        }

        return result;
       
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
        name = name.toLowerCase();
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`searchArtistByArtistName:${name}`);
            if(cache){
                console.log(`hit the cache- searchArtistByArtistName`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        
        let regexName = new RegExp(name, "i");
        const result = await getAll(artists,{ name: { $regex: regexName} } )
        if(result.length<1){
            throw new GraphQLError("Artist Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
            })
        }
        for(let i = 0; i<result.length; i++){
            if(result[i]._id){
                result[i]["id"] = result[i]._id.toString(); 
            }
            if(result[i].dateFormed){
                result[i].dateFormed = validation.dateFormat(result[i].dateFormed);
            }
        }
        try {
            await redisClient.SET(`searchArtistByArtistName:${name}`, JSON.stringify(result));
            await redisClient.EXPIRE(`searchArtistByArtistName:${name}`, 3600);
        } catch (error) {
            console.log(error);
        }

        return result;
       
    },
    companyByFoundedYear: async(_, args)=>{
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
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`companyByFoundedYear:${min}:${max}`);
            if(cache){
                console.log(`hit the cache- companyByFoundedYear`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- getSongsByArtistId`);
        
        let result = await getAll(recordcompanies, {foundedYear: {$gte: min, $lte:max}});
        if(result.length<1){
            throw new GraphQLError("Record Companies Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
            })
        }
        for(let i = 0; i<result.length; i++){
            if(result[i]._id){
                result[i]["id"] = result[i]._id.toString(); 
            }
        }
        try {
            await redisClient.SET(`companyByFoundedYear:${min}:${max}`, JSON.stringify(result));
            await redisClient.EXPIRE(`companyByFoundedYear:${min}:${max}`, 3600);
        } catch (error) {
            console.log(error);
        }

        return result;
    },

    getSongById: async(_,args)=>{
        let {_id:id} = args;
        try {
            id= validation.validObjectId(id, "Song Id");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        const redisClient = await getRedisClient();
        //check if it hits the cache;
        try {
            let cache = await redisClient.get(`${id}`);
            if(cache){
                console.log("hit the cache - Single Song");
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log("miss the cache - Single Song");

        const result = await getOne(songs, {_id: new ObjectId(id)});
        if(!result){
            throw new GraphQLError("Song not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }
        result.id = result._id.toString();
        try {
            await redisClient.SET(`${result.id}`, JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
        return result;
    },

    getSongsByAlbumId: async(_, args)=>{
        let {_id:id} = args;
        try {
            id= validation.validObjectId(id, "Album Id");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        const redisClient = await getRedisClient();
        //check if it hits the cache;
        try {
            let cache = await redisClient.get(`getSongsByAlbumId:${id}`);
            if(cache){
                console.log("hit the cache -  Songs by Album id");
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log("miss the cache - Songs by Album id");


        let result = [];
        const albumExit = await getOne(albums, {_id: new ObjectId(id)});
        if(!albumExit){
            throw new GraphQLError("Album not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }
        const {songs: allSongs} = albumExit;
        for(let i =0; i<allSongs.length; i++){
            const song = await getOne(songs, {_id: allSongs[i]});
            song.id = song._id.toString();
            result.push(song);
        }
        try {
            await redisClient.SET(`getSongsByAlbumId:${id}`, JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
        

        return result;
    }, 
    searchSongByTitle: async(_,args)=>{
        let {searchTitleTerm: term} = args;
        try {
            term = validation.validString(term, "Song title");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }
        term = term.toLowerCase();
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`searchSongByTitle:${term}`);
            if(cache){
                console.log(`hit the cache-searchSongByTitle`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- searchSongByTitle`);

        let regexTitle = new RegExp(term, "i");
        const result = await getAll(songs,{title: { $regex: regexTitle}})
        if(result.length<1){
            throw new GraphQLError("Song not found", {
                extensions: {
                  code: 'NOT_FOUND',
                 },
            }) 
        }
        for(let i = 0; i<result.length; i++){
            if(result[i]._id){
                result[i]["id"] = result[i]._id.toString(); 
            }
        }
        try {
            await redisClient.SET(`searchSongByTitle:${term}`, JSON.stringify(result));
            await redisClient.EXPIRE(`searchSongByTitle:${term}`, 3600);
        } catch (error) {
            console.log(error);
        }

        return result;
    }
  },
  Song:{
    albumId: async(parent)=>{
        let {albumId} = parent;
        const redisClient = await getRedisClient();
            //check if it hits the cache;
            try {
                let cache = await redisClient.get(`${albumId.toString()}`);
                if(cache){
                    console.log("hit the cache - Single Artist");
                    let result = JSON.parse(cache);
                    return result
                }
            } catch (error) {
                console.log(error);
            }
        let result = await getOne(albums, {_id: new ObjectId(albumId)});
        result.id = result._id.toString();
        result.releaseDate = validation.dateFormat(result.releaseDate);
        
        try {
            await redisClient.SET(`${result.id}`, JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
        return result;
    }
  },
  Artist:{
    albums: async(parent)=>{
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`ArtistAlbums:${parent._id.toString()}`);
            if(cache){
                console.log(`hit the cache- albums with Parent Artist `);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- albums with Parents Artist`);

        try {
            let result = await getAll(albums,{artistId: new ObjectId( parent._id)});
            for(let i = 0; i<result.length; i++){
                if(result[i]._id){
                    result[i]["id"] = result[i]._id.toString(); 
                }
                if(result[i].releaseDate){
                    result[i].releaseDate = validation.dateFormat(result[i].releaseDate);
                }
            }
            try {
                await redisClient.SET(`ArtistAlbums:${parent._id.toString()}`, JSON.stringify(result));
                await redisClient.EXPIRE(`ArtistAlbums:${parent._id.toString()}`, 3600);            
            }
                catch (error) {
               console.log(error); 
            }

            return result;
        } catch (error) {
            
        }
    },
    numOfAlbums: async(parent)=>{
        try {
            const result = await getAll(albums, {artistId: new ObjectId(parent._id)});
            return result.length;
        } catch (error) {
            
        }
    },

  }, 
  
  Album:{
    artist: async(parent)=>{
        const redisClient = await getRedisClient();
            try {
                let cache = await redisClient.get(`${parent.artistId.toString()}`);
                if(cache){
                    console.log(`hit the cache- Artist with Parent Album `);
                    let result = JSON.parse(cache);
                    return result
                }
            } catch (error) {
                console.log(error);
            }
            console.log(`miss the cache- Artist with Parents Album`);

            try {
            let result = await getOne(artists, {_id: new ObjectId (parent.artistId)});
            result.id = result._id.toString();
            result.dateFormed = validation.dateFormat(result.dateFormed);
            
            try {
                await redisClient.SET(`${parent.artistId.toString()}`, JSON.stringify(result));
            } catch (error) {
               console.log(error); 
            }
            
            return result;
        } catch (error) {
            
        }
    },

    recordCompany: async (parent) =>{
        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`${parent.recordCompanyId.toString()}`);
            if(cache){
                console.log(`hit the cache- RC with Parent Album`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- RC with Parents Album`);

        try {
            const result = await getOne(recordcompanies, {_id: new ObjectId(parent.recordCompanyId)});
            result.id = result._id.toString();

            try {
                await redisClient.SET(`${parent.recordCompanyId.toString()}`, JSON.stringify(result));
            } catch (error) {
               console.log(error); 
            }

            return result;
        } catch (error) {
            
        }
    },
    songs: async(parent)=>{
        const albumId = parent._id;

        const redisClient = await getRedisClient();
        try {
            let cacheArtits = await redisClient.get(`AlbumSongs:${albumId.toString()}`);
            if(cacheArtits){
                console.log(`hit the cache- Song with Parents Alumb`);
                let result = JSON.parse(cacheArtits);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- Song with Parents album`);

        let result = [];
        const allSongs = await getAll(songs, {albumId: new ObjectId(albumId)});
        for(let i =0; i<allSongs.length; i++){
            let song = allSongs[i];
            song.id = song._id.toString();
            result.push(song);
        }
        
        try {
            await redisClient.SET(`AlbumSongs:${albumId.toString()}`, JSON.stringify(result));
            await redisClient.EXPIRE(`AlbumSongs:${albumId.toString()}`, 3600);
        } catch (error) {
            console.log(error);
        }

        
        return result;
    }
  },
  RecordCompany:{
    albums: async(parent)=>{

        //RCAlbums:${recordCompany}

        const redisClient = await getRedisClient();
        try {
            let cache = await redisClient.get(`RCAlbums:${parent._id.toString()}`);
            if(cache){
                console.log(`hit the cache- albums with Parents RC`);
                let result = JSON.parse(cache);
                return result
            }
        } catch (error) {
            console.log(error);
        }
        console.log(`miss the cache- albums with Parents RC`);

        try {
            const result = await getAll(albums,{recordCompanyId: new ObjectId(parent._id)});
            for(let i = 0; i<result.length; i++){
                if(result[i]._id){
                    result[i]["id"] = result[i]._id.toString(); 
                }
                if(result[i].releaseDate){
                    result[i].releaseDate = validation.dateFormat(result[i].releaseDate);
                }
            }
            try {
                await redisClient.SET(`RCAlbums:${parent._id.toString()}`, JSON.stringify(result));
                await redisClient.EXPIRE(`RCAlbums:${parent._id.toString()}`, 3600);
            } catch (error) {
                console.log(error);
            }

            return result;
        } catch (error) {
            
        }
    },

    numOfAlbums: async(parent)=>{
        try {
            const result = await getAll(albums,{recordCompanyId: new ObjectId(parent._id)});
            return result.length;
        } catch (error) {
            
        }
    },
   
  },

  Mutation:{
    addArtist: async(_, args)=>{
        let {name, date_formed, members}  = args;
        const redisClient = await getRedisClient();

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
        response.id = response._id.toString();
        response.dateFormed = validation.dateFormat(response.dateFormed);

        try {
            await redisClient.SET(`${response.id}`, JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
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
        newArtist.id = newArtist._id.toString();
        newArtist.dateFormed = validation.dateFormat(newArtist.dateFormed);

        const redisClient = await getRedisClient();
        try {
            await redisClient.SET(`${newArtist.id}`, JSON.stringify(newArtist));
        } catch (error) {
            console.log(error);
        }
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
                let deleteFromRecordCompnay = await findOneAndUpdate(recordcompanies,{_id: new ObjectId(recordCompanyId)},{$pull: {albums: album._id}});// remove album from record companies;
                let allSongs = await deleteMany(songs, {albumId: album._id});
                let deleteAlbum = await deleteOne(albums, {_id: album._id});
            } catch (error) {
                throw new GraphQLError("Could not remove albums by artist", {
                    extensions: {
                      code: 'INTERNAL_SERVER_ERROR',
                     },
                }) 
            }
           
        }
        artist.id = artist._id.toString();
        artist.dateFormed = validation.dateFormat(artist.dateFormed);
        const redisClient = await getRedisClient();
        try {
            await redisClient.DEL(`${artist.id}`);
        } catch (error) {
            console.log(error);
        }
        return artist;
    },

     addCompany: async(_, args)=>{
        let {name, founded_year,country} = args;
        const regex = /^[a-zA-Z\s]+$/;
        const redisClient = await getRedisClient();

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
        response.id = response._id.toString();

        try {
            await redisClient.SET(`${response.id}`, JSON.stringify(response));
        } catch (error) {
            console.log(error);
        }
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
        newCompany.id = newCompany._id.toString();
        const redisClient = await getRedisClient();
        try {
            await redisClient.SET(`${newCompany.id}`, JSON.stringify(newCompany));
        } catch (error) {
            console.log(error);
        }
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
                let allSongs = await deleteMany(songs, {albumId:album._id });
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
        recordCompanyExist.id = recordCompanyExist._id.toString();
        const redisClient = await getRedisClient();
        try {
            await redisClient.DEL(`${recordCompanyExist.id}`);
        } catch (error) {
            console.log(error);
        }
        return recordCompanyExist;
    },    

     addAlbum: async(_, args)=>{
        console.log(args);
        let {title, releaseDate, genre, artistId, companyId:recordCompanyId} = args;
        const redisClient = await getRedisClient();

        try {
            title = validation.validString(title, "title");
            releaseDate = validation.validDate(releaseDate, "releaseDate");
            genre = validation.validString(genre, "genre");
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

        // check if same album exists with same artist ID;
        let allAlbumByArtist = await getAll(albums, {artistId: new ObjectId(artistId)});

        for(let i = 0; i<allAlbumByArtist.length; i++){
            if(allAlbumByArtist[i].title == title){
                throw new GraphQLError("Album with the same name and artist ID already exists", {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                }) 
            }
        }

        let obj = {
            "title": title,
            "releaseDate": releaseDate,
            "genre": genre,
            "songs": [],
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
        album.id = album._id.toString();
        album.releaseDate = validation.dateFormat(album.releaseDate);

        try {
            await redisClient.SET(`${album.id}`, JSON.stringify(album));
        } catch (error) {
            console.log(error);
        }
        return album;
    },

     editAlbum: async(_, args)=>{
        console.log(args);
        let {_id:id, title, releaseDate, genre, artistId,companyId:recordCompanyId}= args;
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
                //Remove album id from old Company
                let removeAlbumFromOldRecordComp = await findOneAndUpdate(recordcompanies, {_id:albumExist.recordCompanyId}, {$pull: {albums: new ObjectId(albumExist._id)}})
            
                //add album id to new Company
                let addAlbumToNewArtist = await findOneAndUpdate(recordcompanies,{_id: new ObjectId(recordCompanyId)},{$push:{"albums": new ObjectId(albumExist._id)}});
            }

        let editAlbum = await findOneAndUpdate(albums, {_id: new ObjectId(id)},{$set:queryObj})
        let newAlbum = await getOne(albums, {_id: new ObjectId(id)});
        newAlbum.id = newAlbum._id.toString();
        newAlbum.releaseDate = validation.dateFormat(newAlbum.releaseDate);

        const redisClient = await getRedisClient();
        try {
            await redisClient.SET(`${newAlbum.id}`, JSON.stringify(newAlbum));
        } catch (error) {
            console.log(error);
        }
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
        albumExist.id = albumExist._id.toString();

        const redisClient = await getRedisClient();
        try {
            await redisClient.DEL(`${albumExist.id}`);
        } catch (error) {
            console.log(error);
        }
        return albumExist;
    },
    
    addSong: async(_, args)=>{
        let {title, duration, albumId}= args;
        const regex = /^[a-zA-Z\s]+$/;
           
        console.log(args);
        //Validaiton;
        try {
            title = validation.validString(title, "title");
            if(!regex.test(title)) throw `Title should have only letters`;
            duration = validation.validDuration(duration);
            albumId = validation.validObjectId(albumId, "album id");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            }) 
        }

        //check if album exists;
        const albumExist = await getOne(albums,{_id: new ObjectId(albumId)});
        if(!albumExist){
            throw new GraphQLError("Albun Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
                })
        }

        let queryObj = {
            title,
            duration,
            albumId,
        }
        //check if song title with same duration already exist in that album;
        let {songs: allSongs} = albumExist;

        for(let i =0; i<allSongs.length; i++){
            let song = await getOne(songs, {_id: allSongs[i]});    
            if((song.title === queryObj.title) && (queryObj.duration == song.duration)){
                throw new GraphQLError("Song already exists with same title, albumId and duration ", {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                })  
            }            
        }

        //insert the song in song collection
        let insertSong = await insertOne(songs, {title, duration, albumId: new ObjectId(albumId)});
        if(!insertSong.acknowledged || !insertSong.insertedId){
            throw new GraphQLError("Could not add Song", {
                extensions: {
                  code: 'INTERNAL_SERVER_ERROR',
                 },
            }) 
        }
        //add song id to album songs array;
        let addSongToAlbum = await findOneAndUpdate(albums,{_id: new ObjectId(albumId)}, {$push: {songs: insertSong.insertedId}});
        if(!addSongToAlbum){
            throw new GraphQLError("Could not add Song to album Collection", {
                extensions: {
                code: 'INTERNAL_SERVER_ERROR',
                },
            }) 
        }

        let result = await getOne(songs, {_id: insertSong.insertedId});
        result.id = result._id.toString();
        const redisClient = await getRedisClient();
        try {
            await redisClient.SET(`${result.id}`, JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }

        return result;
        
    },
    editSong: async(_,args)=>{
        let {_id: id, title, duration, albumId} = args;
        //validation
        try {
            id = validation.validObjectId(id, "Song Id");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            })  
        }
        let queryObj ={};
        if(title){
            try {
                title= validation.validString(title, "title");
                const regex = /^[a-zA-Z\s]+$/;
                if(!regex.test(title)) throw `Title should have only letters`;
                queryObj.title =title;
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                })  
            }
        }

        if(duration){
            try {
                duration = validation.validDuration(duration);
                queryObj.duration = duration;
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                })  
            }
        }

        if(albumId){
            try {
                albumId = validation.validObjectId(albumId, "albumId");
                queryObj.albumId = new ObjectId(albumId);
            } catch (error) {
                throw new GraphQLError(error, {
                    extensions: {
                      code: 'BAD_USER_INPUT',
                     },
                })  
            }
        }
        // check if song exist;
        let songExist = await getOne(songs, {_id: new ObjectId(id)});
        if(!songExist){
            throw new GraphQLError("Song Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
                })
        }
        console.log(songExist);
        // Chekc if album Exist
        let albumExit = undefined;
        if(albumId){
            albumExit = await getOne(albums, {_id: new ObjectId(albumId)});
            if(!albumExit){
                throw new GraphQLError("Albun Not found", {
                    extensions: {
                        code: 'NOT_FOUND',
                    },
                })
            }
        }
        console.log(albumExit);
        // update song;
        let updateSong = await findOneAndUpdate(songs, {_id: new ObjectId(id)},{$set: queryObj});
        console.log(updateSong)

        // check if input albumID is different
        if(albumId){
            if(albumId != songExist.albumId.toString()){
                 //TOOD: if different then pull the song id from onld album id
                const removeSongFromOldAlbum = await findOneAndUpdate(albums, {_id: songExist.albumId}, {$pull: {songs: songExist._id}});
                if(!removeSongFromOldAlbum){
                    throw new GraphQLError("Song could not be pulled from old album", {
                        extensions: {
                          code: 'INTERNAL_SERVER_ERROR',
                         },
                    }) 
                }
                //push the song id in new album id;
                const addSongaToNewAlbum = await findOneAndUpdate(albums, {_id: albumExit._id}, {$push: {songs: songExist._id}});
                if(!addSongaToNewAlbum){
                    throw new GraphQLError("Song could not be added to new album", {
                        extensions: {
                          code: 'INTERNAL_SERVER_ERROR',
                         },
                    }) 
                }
            }
        }
        const newSong = await getOne(songs, {_id: songExist._id});
        newSong.id = newSong._id.toString();
        const redisClient = await getRedisClient();
        try {
            await redisClient.SET(`${newSong.id}`, JSON.stringify(newSong));
        } catch (error) {
            console.log(error);
        }
        return newSong;
    },

    removeSong: async(_,args)=>{
        let {_id: id} = args;
        try {
            id = validation.validObjectId(id, "Song Id");
        } catch (error) {
            throw new GraphQLError(error, {
                extensions: {
                  code: 'BAD_USER_INPUT',
                 },
            })  
        }

        // IF SONG EXIST;
        let songExist = await getOne(songs, {_id: new ObjectId(id)});
        if(!songExist){
            throw new GraphQLError("Song Not found", {
                extensions: {
                    code: 'NOT_FOUND',
                },
            })
        }

        // Remove the song from songs collection.
        let deleteSong = await deleteOne(songs, {_id: songExist._id});

        // Pull form song from album
        let pullFromAlbum = await findOneAndUpdate(albums, {_id: songExist.albumId}, {$pull: {songs: songExist._id}});
        if(!pullFromAlbum){
            throw new GraphQLError("Song could not be pulled from album", {
                extensions: {
                  code: 'INTERNAL_SERVER_ERROR',
                 },
            }) 
        }
        songExist.id = songExist._id.toString();
        const redisClient = await getRedisClient();
        try {
            await redisClient.DEL(`${songExist.id}`);
        } catch (error) {
            console.log(error);
        }
        return songExist;
    }
  }
}