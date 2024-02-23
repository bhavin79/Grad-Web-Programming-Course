export const getAll = async(collection, query= undefined)=>{
        const collectionRef = await collection();
        if (query){
            const result = await collectionRef.find(query).toArray();
            return result;
        }
        const result = await collectionRef.find({}).toArray();

       return result.map((obj)=>{
            if(obj._id){
                obj.id = obj._id;
                delete obj._id;
                return obj
            }
            else{
                return obj
            }
       })
}

export const getOne = async(collection, query)=>{
    const collectionRef = await collection();
    const result = await collectionRef.findOne(query);
    result.id = result._id;
    delete result._id;
    return result;
}


export const insertOne = async(collection, query)=>{
    const collectionRef = await collection();
    const result = await collectionRef.insertOne(query);
    return result;
}

export const deleteOne = async(collection, query)=>{
    const collectionRef = await collection();
    const result = await collectionRef.deleteOne(query);
    return result;
}

export const findOneAndUpdate = async(collection, query1, query2)=>{
    const collectionRef = await collection();
    const result = await collectionRef.findOneAndUpdate(query1, query2);
    return result;
}