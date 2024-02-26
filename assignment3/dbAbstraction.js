export const getAll = async(collection, query= undefined)=>{
        const collectionRef = await collection();
        if (query){
            const result = await collectionRef.find(query).toArray();
            return result;
        }
        let result = await collectionRef.find({}).toArray();
        return result
    }

export const getOne = async(collection, query)=>{
    const collectionRef = await collection();
    let result = await collectionRef.findOne(query);
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

export const deleteMany = async(collection, query)=>{
    const collectionRef = await collection();
    const result = await collectionRef.deleteMany(query);
    return result;
}